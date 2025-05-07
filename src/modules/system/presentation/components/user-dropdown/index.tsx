import { UserDropdownMenuComponent } from './user-dropdown-menu.component'
import { UserDropdownRootComponent } from './user-dropdown-root.component'
import { UserDropdownTriggerComponent } from './user-dropdown-trigger.component'

export interface UserAccountInterface {
  name: string
  email?: string
}

export const UserDropdown = {
  Root: UserDropdownRootComponent,
  Menu: UserDropdownMenuComponent,
  Trigger: UserDropdownTriggerComponent
}
