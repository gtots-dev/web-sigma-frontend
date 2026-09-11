'use client'

import { FrameSequence } from '@/modules/shared/presentation/components/frame-sequence'
import { useInfractionVideoViewerContext } from '../../contexts/infraction-video-viewer-context'

export function InfractionVideoViewerSequence() {
  const {
    canvasRef,
    filmstripRef,
    extraction,
    navigation,
    totalFrames,
    currentFrame,
    playback,
    videoRef
  } = useInfractionVideoViewerContext()

  return (
    <>
      <FrameSequence.Root
        isFullyReady={extraction.isFullyReady}
        capturedCount={extraction.capturedFrames.length}
        currentExtractingFrame={extraction.currentExtractingFrame}
        totalFrames={totalFrames}
        extractionProgress={extraction.extractionProgress}
        detectedFps={extraction.detectedFps}
      >
        {extraction.capturedFrames.length > 0 ? (
          <FrameSequence.Filmstrip
            filmstripRef={filmstripRef}
            onStepLeft={() =>
              navigation.stepFrame(
                -1,
                extraction.capturedFrames,
                currentFrame,
                videoRef.current,
                playback.isVideoReady
              )
            }
            onStepRight={() =>
              navigation.stepFrame(
                1,
                extraction.capturedFrames,
                currentFrame,
                videoRef.current,
                playback.isVideoReady
              )
            }
          >
            {extraction.capturedFrames.map((frame) => (
              <FrameSequence.Item
                key={frame.id}
                frame={frame}
                isActive={
                  navigation.activeFrame?.frameNumber === frame.frameNumber &&
                  navigation.displayMode === 'canvas'
                }
                onClick={() => navigation.selectFrame(frame, videoRef.current)}
              />
            ))}
          </FrameSequence.Filmstrip>
        ) : (
          <div className="py-4 text-center text-xs text-muted-foreground">
            Processando e extraindo 100% das imagens…
          </div>
        )}
      </FrameSequence.Root>

      <canvas ref={canvasRef} className="hidden" />
    </>
  )
}
