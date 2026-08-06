import { PatchRestrictionMenuProvider } from '../../contexts/patch-restriction-menu.context'
import { PatchRestrictionMenuContentComponent } from './patch-restriction-menu-content.component'
import { PatchRestrictionMenuFooterComponent } from './patch-restriction-menu-footer.component'
import { PatchRestrictionMenuHeaderComponent } from './patch-restriction-menu-header.component'
import { PatchRestrictionMenuRootComponent } from './patch-restriction-menu-root.component'
import { PatchRestrictionMenuTriggerComponent } from './patch-restriction-menu-trigger.component'

export const PatchRestrictionMenu = {
  Root: PatchRestrictionMenuRootComponent,
  Trigger: PatchRestrictionMenuTriggerComponent,
  Content: PatchRestrictionMenuContentComponent,
  Footer: PatchRestrictionMenuFooterComponent,
  Header: PatchRestrictionMenuHeaderComponent,
  Provider: PatchRestrictionMenuProvider
}
