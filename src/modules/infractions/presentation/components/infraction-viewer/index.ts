import { InfractionImageViewer } from '../infraction-image-viewer'
import { InfractionVideoViewer } from '../infraction-video-viewer'
import { InfractionViewerRoot } from './infraction-viewer-root.component'
import { InfractionViewerEmpty } from './infraction-viewer-empty.component'
import { InfractionViewerStrip } from './infraction-viewer-strip.component'

export const InfractionViewer = {
  Root: InfractionViewerRoot,
  Image: InfractionImageViewer,
  Video: InfractionVideoViewer,
  Empty: InfractionViewerEmpty,
  Strip: InfractionViewerStrip,
}
