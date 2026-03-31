import { PatchVehicleTypeMenuProvider } from '../../contexts/patch-vehicle-type-menu.context'
import { PatchVehicleTypeMenuContentComponent } from './patch-vehicle-type-menu-content.component'
import { PatchVehicleTypeMenuFooterComponent } from './patch-vehicle-type-menu-footer.component'
import { PatchVehicleTypeMenuHeaderComponent } from './patch-vehicle-type-menu-header.component'
import { PatchVehicleTypeMenuRootComponent } from './patch-vehicle-type-menu-root.component'
import { PatchVehicleTypeMenuTriggerComponent } from './patch-vehicle-type-menu-trigger.component'

export const PatchVehicleTypeMenu = {
  Root: PatchVehicleTypeMenuRootComponent,
  Trigger: PatchVehicleTypeMenuTriggerComponent,
  Content: PatchVehicleTypeMenuContentComponent,
  Footer: PatchVehicleTypeMenuFooterComponent,
  Header: PatchVehicleTypeMenuHeaderComponent,
  Provider: PatchVehicleTypeMenuProvider
}
