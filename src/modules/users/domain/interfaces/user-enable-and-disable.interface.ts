import type { UserInterface } from './user.interface'

export interface UserEnableAndDisableInterface {
  id?: UserInterface['id']
  enabled: boolean
}
