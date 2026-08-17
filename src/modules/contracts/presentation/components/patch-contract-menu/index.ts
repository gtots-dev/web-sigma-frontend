import { PatchContractMenuContentComponent } from './patch-contract-menu-content.component'
import { PatchContractMenuFooterComponent } from './patch-contract-menu-footer.component'
import { PatchContractMenuHeaderComponent } from './patch-contract-menu-header.component'
import { PatchContractMenuRootComponent } from './patch-contract-menu-root.component'
import { PatchContractMenuTriggerComponent } from './patch-contract-menu-trigger.component'
import { PatchContractMenuProvider } from '../../contexts/patch-contract-menu.context'

export const PatchContractMenu = {
  Root: PatchContractMenuRootComponent,
  Header: PatchContractMenuHeaderComponent,
  Content: PatchContractMenuContentComponent,
  Footer: PatchContractMenuFooterComponent,
  Trigger: PatchContractMenuTriggerComponent,
  Provider: PatchContractMenuProvider
}
