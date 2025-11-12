import type { PermissionProfileEntity } from '@/modules/permissions/domain/entities/permission-profile.entity'

export interface PostBindUserWithPermissionProfileRouterApiGateway {
  execute(
    permissionProfileIds: PermissionProfileEntity['id'][]
  ): Promise<void>
}
