import { PatchGroupMenuProvider } from '../../contexts/patch-group-menu.context'
import { PatchGroupMenuContentComponent } from './patch-group-menu-content.component'
import { PatchGroupMenuFooterComponent } from './patch-group-menu-footer.component'
import { PatchGroupMenuHeaderComponent } from './patch-group-menu-header.component'
import { PatchGroupMenuRootComponent } from './patch-group-menu-root.component'
import { PatchGroupMenuTriggerComponent } from './patch-group-menu-trigger.component'

export const PatchGroupMenu = {
  Root: PatchGroupMenuRootComponent,
  Trigger: PatchGroupMenuTriggerComponent,
  Content: PatchGroupMenuContentComponent,
  Footer: PatchGroupMenuFooterComponent,
  Header: PatchGroupMenuHeaderComponent,
  Provider: PatchGroupMenuProvider
}
