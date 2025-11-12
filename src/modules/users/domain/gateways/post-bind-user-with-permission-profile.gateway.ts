import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'

export interface PostBindUserWithPermissionProfileGateway {
  execute(
    permissionProfileIds: PermissionProfileInterface['id'][]
  ): Promise<void>
}
