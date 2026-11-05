'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { LaneOptionsDropdown } from '.'
import { LaneModalTrigger } from '../lane-modal-triggers'

export function LaneOptionsDropdownClient({
  isAdmin,
  permissions
}: {
  isAdmin: boolean
  permissions: Set<PermissionEnum>
}) {
  const canEdit = isAdmin || permissions.has(PermissionEnum.LANES_EDIT)
  const canToggleStatus =
    isAdmin || permissions.has(PermissionEnum.LANES_ENABLE_AND_DISABLE)

  if (!canEdit && !canToggleStatus) {
    return null
  }

  return (
    <LaneOptionsDropdown.Root>
      <LaneOptionsDropdown.Trigger />

      <LaneOptionsDropdown.Menu>
        {canEdit && (
          <LaneOptionsDropdown.Item>
            <LaneModalTrigger.Patch />
          </LaneOptionsDropdown.Item>
        )}

        {canToggleStatus && (
          <LaneOptionsDropdown.Item>
            <LaneModalTrigger.PatchStatus />
          </LaneOptionsDropdown.Item>
        )}
      </LaneOptionsDropdown.Menu>
    </LaneOptionsDropdown.Root>
  )
}
