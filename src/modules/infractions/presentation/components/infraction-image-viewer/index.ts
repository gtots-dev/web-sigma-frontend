import { InfractionImageViewerRoot } from './infraction-image-viewer-root.component'
import { InfractionImageViewerDisplay } from './infraction-image-viewer-display.component'
import { InfractionImageViewerNav } from './infraction-image-viewer-nav.component'
import { InfractionImageViewerBadge } from './infraction-image-viewer-badge.component'
import { InfractionImageViewerFullscreen } from './infraction-image-viewer-fullscreen.component'

export const InfractionImageViewer = Object.assign(InfractionImageViewerRoot, {
  Root: InfractionImageViewerRoot,
  Display: InfractionImageViewerDisplay,
  Nav: InfractionImageViewerNav,
  Badge: InfractionImageViewerBadge,
  Fullscreen: InfractionImageViewerFullscreen
})
