import type { PermissionProfileInterface } from './permission-profiles.interface'

export interface GetPermissionProfilesServiceInterface {
  execute(): Promise<PermissionProfileInterface[]>
}
