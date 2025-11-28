import { PatchPointStatusMenuProvider } from '../../contexts/patch-point-status-menu.context'
import { PatchPointStatusMenuContentComponent } from './patch-point-status-menu-content.component'
import { PatchPointStatusMenuFooterComponent } from './patch-point-status-menu-footer.component'
import { PatchPointStatusMenuHeaderComponent } from './patch-point-status-menu-header.component'
import { PatchPointStatusMenuRootComponent } from './patch-point-status-menu-root.component'
import { PatchPointStatusMenuTriggerComponent } from './patch-point-status-menu-trigger.component'

export const PatchPointStatusMenu = {
  Root: PatchPointStatusMenuRootComponent,
  Trigger: PatchPointStatusMenuTriggerComponent,
  Content: PatchPointStatusMenuContentComponent,
  Footer: PatchPointStatusMenuFooterComponent,
  Header: PatchPointStatusMenuHeaderComponent,
  Provider: PatchPointStatusMenuProvider
}
