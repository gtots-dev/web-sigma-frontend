'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { GroupOptionsDropdown } from '.'
import { GroupModalTrigger } from '../group-modal-triggers'

export function GroupOptionsDropdownClient({
  isAdmin,
  permissions
}: {
  isAdmin: boolean
  permissions: Set<PermissionEnum>
}) {
  return (
    <GroupOptionsDropdown.Root>
      <GroupOptionsDropdown.Trigger />

      <GroupOptionsDropdown.Menu>
        <GroupOptionsDropdown.Item>
          <GroupModalTrigger.ViewMore />
        </GroupOptionsDropdown.Item>

        {(isAdmin || permissions.has(PermissionEnum.GROUPS_EDIT)) && (
          <>
            <GroupOptionsDropdown.Item>
              <GroupModalTrigger.PostLane />
            </GroupOptionsDropdown.Item>

            <GroupOptionsDropdown.Item>
              <GroupModalTrigger.PostPoint />
            </GroupOptionsDropdown.Item>

            <GroupOptionsDropdown.Item>
              <GroupModalTrigger.PostSubgroup />
            </GroupOptionsDropdown.Item>

            <GroupOptionsDropdown.Item>
              <GroupModalTrigger.Patch />
            </GroupOptionsDropdown.Item>
          </>
        )}

        {(isAdmin ||
          permissions.has(PermissionEnum.GROUPS_ENABLE_AND_DISABLE)) && (
          <GroupOptionsDropdown.Item>
            <GroupModalTrigger.PatchStatus />
          </GroupOptionsDropdown.Item>
        )}
      </GroupOptionsDropdown.Menu>
    </GroupOptionsDropdown.Root>
  )
}
