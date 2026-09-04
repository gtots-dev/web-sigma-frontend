import { VideoPlayerRootComponent } from './video-player-root.component'
import { VideoPlayerViewportComponent } from './video-player-viewport.component'
import { VideoPlayerLoadingMaskComponent } from './video-player-loading-mask.component'
import { VideoPlayerCanvasDisplayComponent } from './video-player-canvas-display.component'
import { VideoPlayerControlsComponent } from './video-player-controls.component'
import { VideoPlayerTimeSliderComponent } from './video-player-time-slider.component'
import { VideoPlayerPlaybackButtonsComponent } from './video-player-playback-buttons.component'
import { VideoPlayerMetadataComponent } from './video-player-metadata.component'
import { VideoPlayerFooterComponent } from './video-player-footer.component'

export const VideoPlayer = {
  Root: VideoPlayerRootComponent,
  Viewport: VideoPlayerViewportComponent,
  LoadingMask: VideoPlayerLoadingMaskComponent,
  CanvasDisplay: VideoPlayerCanvasDisplayComponent,
  Controls: VideoPlayerControlsComponent,
  TimeSlider: VideoPlayerTimeSliderComponent,
  PlaybackButtons: VideoPlayerPlaybackButtonsComponent,
  Metadata: VideoPlayerMetadataComponent,
  Footer: VideoPlayerFooterComponent,
}
