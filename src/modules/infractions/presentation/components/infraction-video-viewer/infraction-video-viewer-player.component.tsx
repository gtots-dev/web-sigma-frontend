'use client'

import { VideoPlayer } from '@/modules/shared/presentation/components/video-player'
import { useInfractionVideoViewerContext } from '../../contexts/infraction-video-viewer-context'

interface InfractionVideoViewerPlayerProps {
  src?: string
}

export function InfractionVideoViewerPlayer({
  src
}: InfractionVideoViewerPlayerProps = {}) {
  const {
    src: contextSrc,
    videoRef,
    isInspecting,
    navigation,
    playback,
    totalFrames,
    currentFrame,
    handleLoadedMetadata,
    handleTogglePlay,
    extraction
  } = useInfractionVideoViewerContext()

  const videoSrc = src || contextSrc
  const isVideoReady =
    playback.isVideoReady || (videoRef.current?.readyState ?? 0) >= 1

  return (
    <VideoPlayer.Root>
      <VideoPlayer.Viewport>
        <video
          ref={videoRef}
          src={videoSrc}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={playback.onEnded}
          onClick={handleTogglePlay}
          preload="auto"
          className={`w-full h-full object-contain cursor-pointer transition-opacity duration-200 ${
            isInspecting
              ? 'opacity-0 absolute pointer-events-none'
              : 'opacity-100'
          }`}
        />

        {isInspecting && navigation.activeFrame && (
          <VideoPlayer.CanvasDisplay activeFrame={navigation.activeFrame} />
        )}
      </VideoPlayer.Viewport>

      <VideoPlayer.Controls>
        <VideoPlayer.TimeSlider
          currentTime={playback.currentTime}
          duration={playback.metadata.duration}
          isVideoReady={isVideoReady}
          currentFrame={currentFrame}
          totalFrames={totalFrames}
          onInputScrub={(t) => {
            playback.setCurrentTime(t)
            navigation.handleTimelineSeek(t, videoRef.current)
          }}
          onSeekEnd={(finalTime) => {
            playback.setCurrentTime(finalTime)
            navigation.syncVideoOnSeekEnd(videoRef.current, finalTime)
          }}
        />

        <VideoPlayer.Footer>
          <VideoPlayer.PlaybackButtons
            isVideoReady={isVideoReady}
            isPlaying={playback.isPlaying}
            onStep={(delta) =>
              navigation.stepFrame(
                delta,
                extraction.capturedFrames,
                currentFrame,
                videoRef.current,
                playback.isVideoReady
              )
            }
            onTogglePlay={handleTogglePlay}
          />
          <VideoPlayer.Metadata
            isFullyReady={isVideoReady}
            hasActiveFrame={!!navigation.activeFrame}
            activeFrameNumber={currentFrame}
            totalFrames={totalFrames}
            currentTime={playback.currentTime}
            duration={playback.metadata.duration}
            onDownload={navigation.downloadActiveFrame}
          />
        </VideoPlayer.Footer>
      </VideoPlayer.Controls>
    </VideoPlayer.Root>
  )
}
