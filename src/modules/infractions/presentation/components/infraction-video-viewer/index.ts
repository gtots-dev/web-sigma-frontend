import { InfractionVideoViewerMain } from './infraction-video-viewer-main.component'
import { InfractionVideoViewerRoot } from './infraction-video-viewer-root.component'
import { InfractionVideoViewerPlayer } from './infraction-video-viewer-player.component'
import { InfractionVideoViewerSequence } from './infraction-video-viewer-sequence.component'
import {
  InfractionVideoViewerProvider,
  useInfractionVideoViewerContext
} from '../../contexts/infraction-video-viewer-context'

export const InfractionVideoViewer = Object.assign(InfractionVideoViewerMain, {
  Root: InfractionVideoViewerRoot,
  Main: InfractionVideoViewerMain,
  Player: InfractionVideoViewerPlayer,
  Sequence: InfractionVideoViewerSequence,
  Provider: InfractionVideoViewerProvider
})

export * from './infraction-video-viewer-root.component'
export * from './infraction-video-viewer-player.component'
export * from './infraction-video-viewer-sequence.component'
export * from './infraction-video-viewer-main.component'
export * from '../../contexts/infraction-video-viewer-context'
