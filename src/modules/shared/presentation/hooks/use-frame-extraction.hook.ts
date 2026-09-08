import { useCallback, useRef } from 'react'
import { CapturedFrame } from '@/modules/shared/domain/interfaces/capture-frame.interface'
import { useDetectVideoFps, DEFAULT_FPS } from './use-detect-video-fps.hook'
import { useFrameCanvasDrawer } from './use-frame-canvas-drawer.hook'
import {
  useExtractionState,
  ExtractionState
} from './use-extraction-state.hook'

export type { ExtractionState }

export interface UseFrameExtractionReturn extends ExtractionState {
  startExtraction: (
    src: string,
    canvasEl: HTMLCanvasElement,
    duration: number
  ) => Promise<{ frames: CapturedFrame[]; fps: number }>
  reset: () => void
}

/**
 * Hook orquestrador da extração de quadros de vídeo.
 * - `useDetectVideoFps`: detecção de FPS do vídeo.
 * - `useFrameCanvasDrawer`: renderização e captura dos quadros no canvas.
 * - `useExtractionState`: gerenciamento do estado da extração.
 */
export function useFrameExtraction(): UseFrameExtractionReturn {
  const { state, setState, resetState } = useExtractionState()
  const { detectFps } = useDetectVideoFps()
  const { captureFrameFromVideo } = useFrameCanvasDrawer()
  const extractorVideoRef = useRef<HTMLVideoElement | null>(null)

  const reset = useCallback(() => {
    if (extractorVideoRef.current) {
      if (extractorVideoRef.current.parentNode) {
        extractorVideoRef.current.parentNode.removeChild(
          extractorVideoRef.current
        )
      }
      extractorVideoRef.current.src = ''
      extractorVideoRef.current = null
    }
    resetState()
  }, [resetState])

  const startExtraction = useCallback(
    async (
      src: string,
      canvasEl: HTMLCanvasElement,
      duration: number
    ): Promise<{ frames: CapturedFrame[]; fps: number }> => {
      if (!src || duration === 0) return { frames: [], fps: DEFAULT_FPS }

      let effectiveSrc = src
      let objectUrlToRevoke: string | null = null

      if (src.startsWith('http') || src.startsWith('/')) {
        try {
          const res = await fetch(src, { mode: 'cors' })
          if (res.ok) {
            const blob = await res.blob()
            objectUrlToRevoke = URL.createObjectURL(blob)
            effectiveSrc = objectUrlToRevoke
          }
        } catch (e) {
          console.warn('[useFrameExtraction] Fetch blob fallback warning:', e)
        }
      }

      const extractorVideo = document.createElement('video')
      extractorVideo.crossOrigin = 'anonymous'
      extractorVideo.src = effectiveSrc
      extractorVideo.muted = true
      extractorVideo.preload = 'auto'
      extractorVideo.style.cssText =
        'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;'
      document.body.appendChild(extractorVideo)

      extractorVideoRef.current = extractorVideo

      setState({
        capturedFrames: [],
        isExtracting: true,
        isFullyReady: false,
        extractionProgress: 0,
        currentExtractingFrame: 0,
        detectedFps: DEFAULT_FPS
      })

      // Aguarda os metadados do vídeo
      await new Promise<void>((resolve) => {
        const onReady = () => {
          extractorVideo.removeEventListener('loadeddata', onReady)
          extractorVideo.removeEventListener('error', onReady)
          resolve()
        }
        if (extractorVideo.readyState >= 2) {
          resolve()
        } else {
          extractorVideo.addEventListener('loadeddata', onReady)
          extractorVideo.addEventListener('error', onReady)
        }
      })

      // Detecta o FPS nativo do vídeo via micro-hook
      const probedFps = await detectFps(extractorVideo)
      const totalFrameCount = Math.round(duration * probedFps)

      setState((prev) => ({ ...prev, detectedFps: probedFps }))

      const ctx = canvasEl.getContext('2d', { willReadFrequently: true })
      if (!ctx) {
        if (extractorVideo.parentNode)
          extractorVideo.parentNode.removeChild(extractorVideo)
        if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke)
        return { frames: [], fps: probedFps }
      }

      canvasEl.width = extractorVideo.videoWidth || 640
      canvasEl.height = extractorVideo.videoHeight || 480

      const frameTime = 1 / probedFps
      const extractedList: CapturedFrame[] = []

      for (let f = 0; f < totalFrameCount; f++) {
        if (extractorVideoRef.current !== extractorVideo) break

        const targetTime = Math.min(f * frameTime, duration)

        setState((prev) => ({ ...prev, currentExtractingFrame: f }))

        const frame = await captureFrameFromVideo(
          extractorVideo,
          canvasEl,
          f,
          targetTime
        )

        extractedList.push(frame)

        setState((prev) => ({
          ...prev,
          capturedFrames: [...extractedList],
          extractionProgress: Math.round(((f + 1) / totalFrameCount) * 100)
        }))
      }

      if (extractorVideo.parentNode) {
        extractorVideo.parentNode.removeChild(extractorVideo)
      }
      extractorVideo.src = ''
      extractorVideoRef.current = null
      if (objectUrlToRevoke) {
        URL.revokeObjectURL(objectUrlToRevoke)
      }

      setState({
        capturedFrames: extractedList,
        isExtracting: false,
        isFullyReady: true,
        extractionProgress: 100,
        currentExtractingFrame: extractedList.length,
        detectedFps: probedFps
      })

      return { frames: extractedList, fps: probedFps }
    },
    [detectFps, captureFrameFromVideo, setState]
  )

  return { ...state, startExtraction, reset }
}
