'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { PermissionProfileOptionsDropdown } from '.'
import { PermissionProfileModalTrigger } from '../permission-profile-modal-triggers'

export function PermissionProfileOptionsDropdownClientComponent({
  isAdmin,
  permissions
}: {
  isAdmin: boolean
  permissions: Set<PermissionEnum>
}) {
  const canEdit = isAdmin || permissions.has(PermissionEnum.PERMISSIONS_EDIT)
  const canToggleStatus =
    isAdmin || permissions.has(PermissionEnum.PERMISSIONS_ENABLE_AND_DISABLE)

  if (!canEdit && !canToggleStatus) {
    return null
  }

  return (
    <PermissionProfileOptionsDropdown.Root>
      <PermissionProfileOptionsDropdown.Trigger />
      <PermissionProfileOptionsDropdown.Menu>
        {canEdit && (
          <PermissionProfileOptionsDropdown.Item>
            <PermissionProfileModalTrigger.Patch />
          </PermissionProfileOptionsDropdown.Item>
        )}

        {canToggleStatus && (
          <PermissionProfileOptionsDropdown.Item>
            <PermissionProfileModalTrigger.PatchStatus />
          </PermissionProfileOptionsDropdown.Item>
        )}
      </PermissionProfileOptionsDropdown.Menu>
    </PermissionProfileOptionsDropdown.Root>
  )
}
