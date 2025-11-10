import type { PermissionProfileInterface } from '../interfaces/permission-profiles.interface'

export interface GetPermissionProfilesGateway {
  execute(): Promise<PermissionProfileInterface[]>
}
