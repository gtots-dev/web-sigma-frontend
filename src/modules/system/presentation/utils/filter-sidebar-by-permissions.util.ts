import type { UserPermissionsInterface } from '@/modules/users/domain/interfaces/user-permissions.interface'
import { PermissionEnum } from '../../domain/enums/permissions.enum'
import type { Item } from '../components/sidebar-system'

export function filterSidebarByPermissions(
  items: Item[],
  permissions: UserPermissionsInterface,
  operationId: string | null
): Item[] {
  const userPermissions =
    operationId && permissions && Array.isArray(permissions[operationId])
      ? permissions[operationId]
      : []

  return items
    .map((item) => {
      const hasAccess =
        item.permissions.includes(PermissionEnum.NOT_REQUIRED) ||
        item.permissions.some((p) => userPermissions.includes(p))

      const filteredChildren = item.items
        ? filterSidebarByPermissions(item.items, permissions, operationId)
        : []

      if (!hasAccess && filteredChildren.length === 0) return null

      return {
        ...item,
        items: filteredChildren
      }
    })
    .filter(Boolean) as Item[]
}
