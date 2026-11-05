'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { PointOptionsDropdown } from '.'
import { PointModalTrigger } from '../point-modal-triggers'

export function PointOptionsDropdownClient({
  isAdmin,
  permissions
}: {
  isAdmin: boolean
  permissions: Set<PermissionEnum>
}) {
  return (
    <PointOptionsDropdown.Root>
      <PointOptionsDropdown.Trigger />

      <PointOptionsDropdown.Menu>
        <PointOptionsDropdown.Item>
          <PointModalTrigger.ViewMore />
        </PointOptionsDropdown.Item>

        {(isAdmin || permissions.has(PermissionEnum.POINTS_EDIT)) && (
          <>
            <PointOptionsDropdown.Item>
              <PointModalTrigger.PostLane />
            </PointOptionsDropdown.Item>

            <PointOptionsDropdown.Item>
              <PointModalTrigger.Patch />
            </PointOptionsDropdown.Item>
          </>
        )}

        {(isAdmin ||
          permissions.has(PermissionEnum.POINTS_ENABLE_AND_DISABLE)) && (
          <PointOptionsDropdown.Item>
            <PointModalTrigger.PatchStatus />
          </PointOptionsDropdown.Item>
        )}
      </PointOptionsDropdown.Menu>
    </PointOptionsDropdown.Root>
  )
}
