import type { PermissionProfileInterface } from './permission-profiles.interface'

export interface PermissionProfileEnableAndDisableInterface {
  id?: PermissionProfileInterface['id']
  enabled: boolean
}
