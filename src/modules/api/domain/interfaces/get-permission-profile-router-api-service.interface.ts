import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'

export interface GetPermissionProfilesRouterApiServiceInterface {
  execute(): Promise<PermissionProfileInterface[]>
}
