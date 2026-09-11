import { useState, useCallback, useRef } from 'react'
import { CapturedFrame } from '@/modules/shared/domain/interfaces/capture-frame.interface'

export type DisplayMode = 'video' | 'canvas'

interface UseFrameNavigationReturn {
  activeFrame: CapturedFrame | null
  displayMode: DisplayMode
  setDisplayMode: (mode: DisplayMode) => void
  selectFrame: (frame: CapturedFrame, videoEl?: HTMLVideoElement | null) => void
  stepFrame: (
    delta: number,
    capturedFrames: CapturedFrame[],
    currentFrame: number,
    videoEl?: HTMLVideoElement | null,
    isReady?: boolean
  ) => void
  handleTimelineSeek: (
    targetTime: number,
    videoEl: HTMLVideoElement | null
  ) => void
  syncVideoOnSeekEnd: (videoEl: HTMLVideoElement | null, currentTime: number) => void
  handleFrameBarSeek: (
    targetFrameNum: number,
    capturedFrames: CapturedFrame[],
    videoEl: HTMLVideoElement | null,
    isReady: boolean
  ) => void
  downloadActiveFrame: () => void
}

/**
 * Gerencia a seleção e inspeção de quadros e a lógica de seek da linha do tempo.
 *
 * - `selectFrame`: seleciona diretamente um quadro (clique no filmstrip) -> altera para inspeção de 'canvas'
 * - `stepFrame`: avança/recua N quadros -> altera para inspeção de 'canvas'
 * - `handleTimelineSeek`: realiza busca (seek) no vídeo nativo em tempo real -> mantém o modo 'video' (evitando tela preta)
 * - `syncVideoOnSeekEnd`: sincroniza o currentTime do vídeo ao finalizar a navegação no slider
 * - `downloadActiveFrame`: dispara o download no navegador da imagem JPEG do quadro ativo
 */
export function useFrameNavigation(): UseFrameNavigationReturn {
  const [activeFrame, setActiveFrame] = useState<CapturedFrame | null>(null)
  const [displayMode, setDisplayMode] = useState<DisplayMode>('video')
  const rafRef = useRef<number | null>(null)

  const selectFrame = useCallback(
    (frame: CapturedFrame, videoEl?: HTMLVideoElement | null) => {
      setActiveFrame(frame)
      setDisplayMode('canvas')
      if (videoEl) {
        videoEl.currentTime = frame.timeSeconds
      }
    },
    []
  )

  const stepFrame = useCallback(
    (
      delta: number,
      capturedFrames: CapturedFrame[],
      currentFrame: number,
      videoEl?: HTMLVideoElement | null,
      isReady = true
    ) => {
      if (!isReady) return

      if (videoEl && !videoEl.paused) {
        videoEl.pause()
      }

      // Se possuir quadros capturados, seleciona a partir do array
      if (capturedFrames.length > 0) {
        const nextIndex = Math.max(0, Math.min(currentFrame + delta, capturedFrames.length - 1))
        const target = capturedFrames[nextIndex]

        if (target) {
          setActiveFrame(target)
          setDisplayMode('canvas')
          if (videoEl) {
            videoEl.currentTime = target.timeSeconds
          }
        }
      } else if (videoEl) {
        // Passo alternativo se a extração ainda estiver em andamento: altera o currentTime do vídeo diretamente
        const stepTime = 1 / 15 // passo de ~15 FPS
        const newTime = Math.max(0, Math.min(videoEl.currentTime + delta * stepTime, videoEl.duration || 0))
        videoEl.currentTime = newTime
        setDisplayMode('video')
      }
    },
    []
  )

  const handleTimelineSeek = useCallback(
    (targetTime: number, videoEl: HTMLVideoElement | null) => {
      setDisplayMode('video')

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        if (videoEl) {
          videoEl.currentTime = targetTime
        }
      })
    },
    []
  )

  const syncVideoOnSeekEnd = useCallback(
    (videoEl: HTMLVideoElement | null, currentTime: number) => {
      setDisplayMode('video')
      if (videoEl) {
        videoEl.currentTime = currentTime
      }
    },
    []
  )

  const handleFrameBarSeek = useCallback(
    (
      targetFrameNum: number,
      capturedFrames: CapturedFrame[],
      videoEl: HTMLVideoElement | null,
      isReady: boolean
    ) => {
      if (!isReady || capturedFrames.length === 0) return

      const target =
        capturedFrames[targetFrameNum] ??
        capturedFrames.find((f) => f.frameNumber === targetFrameNum)

      if (target) {
        setActiveFrame(target)
        setDisplayMode('canvas')
        if (videoEl) {
          videoEl.currentTime = target.timeSeconds
        }
      }
    },
    []
  )

  const downloadActiveFrame = useCallback(() => {
    if (!activeFrame) return
    const link = document.createElement('a')
    link.href = activeFrame.dataUrl
    link.download = `imagem_${activeFrame.frameNumber + 1}_${activeFrame.timestamp.replace(':', '-')}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [activeFrame])

  return {
    activeFrame,
    displayMode,
    setDisplayMode,
    selectFrame,
    stepFrame,
    handleTimelineSeek,
    syncVideoOnSeekEnd,
    handleFrameBarSeek,
    downloadActiveFrame,
  }
}
