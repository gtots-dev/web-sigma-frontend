import { useCallback } from 'react'

export const DEFAULT_FPS: number = 30

export interface VideoFrameCallbackMetadata {
  presentationTime: DOMHighResTimeStamp
  expectedDisplayTime: DOMHighResTimeStamp
  width: number
  height: number
  mediaTime: number
  presentedFrames: number
  processingDuration?: number
  captureTime?: DOMHighResTimeStamp
  receiveTime?: DOMHighResTimeStamp
  rtpTimestamp?: number
}

export type VideoFrameRequestCallback = (
  now: DOMHighResTimeStamp,
  metadata: VideoFrameCallbackMetadata
) => void

export type VideoWithFrameCallback = HTMLVideoElement & {
  requestVideoFrameCallback: (callback: VideoFrameRequestCallback) => number
  cancelVideoFrameCallback: (handle: number) => void
}

/**
 * Mede com precisão o FPS nativo da faixa de vídeo amostrando tempos de apresentação de quadros
 * via requestVideoFrameCallback após um breve atraso de aquecimento do decodificador.
 */
export function useDetectVideoFps() {
  const detectFps = useCallback(async (videoEl: HTMLVideoElement): Promise<number> => {
    return new Promise((resolve) => {
      const probe = async () => {
        try {
          if ('requestVideoFrameCallback' in videoEl) {
            const videoWithCallback = videoEl as VideoWithFrameCallback
            const mediaTimes: number[] = []
            videoEl.currentTime = 0
            videoEl.muted = true

            try {
              await videoEl.play()
              // Aguarda 100ms para a inicialização do decodificador antes de capturar deltas de quadros
              await new Promise((r) => setTimeout(r, 100))

              await new Promise<void>((res) => {
                let handleId: number | null = null
                const onFrame: VideoFrameRequestCallback = (_, metadata) => {
                  mediaTimes.push(metadata.mediaTime)
                  if (mediaTimes.length < 15 && videoEl.currentTime < 0.8) {
                    handleId = videoWithCallback.requestVideoFrameCallback(onFrame)
                  } else {
                    res()
                  }
                }

                handleId = videoWithCallback.requestVideoFrameCallback(onFrame)
                setTimeout(() => {
                  if (handleId !== null) {
                    videoWithCallback.cancelVideoFrameCallback(handleId)
                  }
                  res()
                }, 800)
              })
              videoEl.pause()
              videoEl.currentTime = 0
            } catch (e) {
              console.warn('[FPS DEBUG] Playback probe warning:', e)
              videoEl.pause()
            }

            if (mediaTimes.length >= 3) {
              const deltas: number[] = []
              for (let i = 1; i < mediaTimes.length; i++) {
                const diff = mediaTimes[i] - mediaTimes[i - 1]
                if (diff > 0.005) deltas.push(diff)
              }
              if (deltas.length > 0) {
                const avgDelta = deltas.reduce((a, b) => a + b, 0) / deltas.length
                const rawFps = 1 / avgDelta
                const detected = Math.round(rawFps)
                if (detected >= 1 && detected <= 120) {
                  resolve(detected)
                  return
                }
              }
            }
          }
        } catch (err) {
          console.error('[FPS DEBUG] Probe error:', err)
        }
        resolve(DEFAULT_FPS)
      }

      if (videoEl.readyState >= 2) {
        probe()
      } else {
        videoEl.addEventListener('loadeddata', probe, { once: true })
      }
    })
  }, [])

  return { detectFps }
}
