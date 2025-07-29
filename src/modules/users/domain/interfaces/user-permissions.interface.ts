import type { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'

export interface UserPermissionsInterface {
  permissions: Record<string, PermissionEnum[]>
}
