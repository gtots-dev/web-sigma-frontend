import { InfractionVideoViewerRoot } from './infraction-video-viewer-root.component'
import { InfractionVideoViewerPlayer } from './infraction-video-viewer-player.component'
import { InfractionVideoViewerSequence } from './infraction-video-viewer-sequence.component'
import { InfractionVideoViewerProvider } from '../../contexts/infraction-video-viewer-context'

export const InfractionVideoViewer = {
  Root: InfractionVideoViewerRoot,
  Player: InfractionVideoViewerPlayer,
  Sequence: InfractionVideoViewerSequence,
  Provider: InfractionVideoViewerProvider
}
