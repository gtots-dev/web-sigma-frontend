import { PatchGroupStatusMenuProvider } from '../../contexts/patch-group-status-menu.context'
import { PatchGroupStatusMenuContentComponent } from './patch-group-status-menu-content.component'
import { PatchGroupStatusMenuFooterComponent } from './patch-group-status-menu-footer.component'
import { PatchGroupStatusMenuHeaderComponent } from './patch-group-status-menu-header.component'
import { PatchGroupStatusMenuRootComponent } from './patch-group-status-menu-root.component'
import { PatchGroupStatusMenuTriggerComponent } from './patch-group-status-menu-trigger.component'

export const PatchGroupStatusMenu = {
  Root: PatchGroupStatusMenuRootComponent,
  Trigger: PatchGroupStatusMenuTriggerComponent,
  Content: PatchGroupStatusMenuContentComponent,
  Footer: PatchGroupStatusMenuFooterComponent,
  Header: PatchGroupStatusMenuHeaderComponent,
  Provider: PatchGroupStatusMenuProvider
}
