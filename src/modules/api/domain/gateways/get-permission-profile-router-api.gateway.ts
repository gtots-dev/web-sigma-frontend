import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'

export interface GetPermissionProfilesRouterApiGateway {
  execute(): Promise<PermissionProfileInterface[]>
}
