import { useCallback } from 'react'
import { CapturedFrame } from '@/modules/shared/domain/interfaces/capture-frame.interface'
import { formatFrameTimecode } from './use-video-format.hook'

/**
 * Aguarda o evento de 'seeked' do vídeo com um fallback de tempo limite.
 */
export function waitForSeek(videoEl: HTMLVideoElement): Promise<void> {
  return new Promise((resolve) => {
    const handle = () => {
      videoEl.removeEventListener('seeked', handle)
      resolve()
    }
    videoEl.addEventListener('seeked', handle)
    setTimeout(() => {
      videoEl.removeEventListener('seeked', handle)
      resolve()
    }, 150)
  })
}

/**
 * Hook responsável pela renderização de quadros do elemento de vídeo no Canvas
 * e conversão para objetos `CapturedFrame`.
 */
export function useFrameCanvasDrawer() {
  const captureFrameFromVideo = useCallback(
    async (
      videoEl: HTMLVideoElement,
      canvasEl: HTMLCanvasElement,
      frameIndex: number,
      targetTime: number
    ): Promise<CapturedFrame> => {
      videoEl.currentTime = targetTime
      await waitForSeek(videoEl)

      const ctx = canvasEl.getContext('2d', { willReadFrequently: true })
      if (ctx) {
        ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height)
      }

      let dataUrl = ''
      try {
        dataUrl = canvasEl.toDataURL('image/jpeg', 0.85)
      } catch (e) {
        console.warn('[useFrameCanvasDrawer] Canvas toDataURL warning:', e)
      }

      return {
        id: `seq-${frameIndex}`,
        dataUrl,
        frameNumber: frameIndex,
        timestamp: formatFrameTimecode(targetTime),
        timeSeconds: targetTime,
        width: videoEl.videoWidth,
        height: videoEl.videoHeight
      }
    },
    []
  )

  return { captureFrameFromVideo }
}
