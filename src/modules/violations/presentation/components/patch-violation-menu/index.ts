import { PatchViolationMenuProvider } from '../../contexts/patch-violation-menu.context'
import { PatchViolationMenuContentComponent } from './patch-violation-menu-content.component'
import { PatchViolationMenuFooterComponent } from './patch-violation-menu-footer.component'
import { PatchViolationMenuHeaderComponent } from './patch-violation-menu-header.component'
import { PatchViolationMenuRootComponent } from './patch-violation-menu-root.component'
import { PatchViolationMenuTriggerComponent } from './patch-violation-menu-trigger.component'

export const PatchViolationMenu = {
  Root: PatchViolationMenuRootComponent,
  Trigger: PatchViolationMenuTriggerComponent,
  Content: PatchViolationMenuContentComponent,
  Footer: PatchViolationMenuFooterComponent,
  Header: PatchViolationMenuHeaderComponent,
  Provider: PatchViolationMenuProvider
}
