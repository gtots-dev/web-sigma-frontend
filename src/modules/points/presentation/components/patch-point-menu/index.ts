import { PatchPointMenuProvider } from '../../contexts/patch-point-menu.context'
import { PatchPointMenuContentComponent } from './patch-point-menu-content.component'
import { PatchPointMenuFooterComponent } from './patch-point-menu-footer.component'
import { PatchPointMenuHeaderComponent } from './patch-point-menu-header.component'
import { PatchPointMenuRootComponent } from './patch-point-menu-root.component'
import { PatchPointMenuTriggerComponent } from './patch-point-menu-trigger.component'

export const PatchPointMenu = {
  Root: PatchPointMenuRootComponent,
  Trigger: PatchPointMenuTriggerComponent,
  Content: PatchPointMenuContentComponent,
  Footer: PatchPointMenuFooterComponent,
  Header: PatchPointMenuHeaderComponent,
  Provider: PatchPointMenuProvider
}
