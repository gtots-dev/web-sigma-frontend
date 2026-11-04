'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { RestrictionsOptionsDropdown } from '.'
import { RestrictionModalTrigger } from '../restriction-modal-triggers'

export function RestrictionsOptionsDropdownClient({
  isAdmin,
  permissions
}: {
  isAdmin: boolean
  permissions: Set<PermissionEnum>
}) {
  if (!isAdmin && !permissions.has(PermissionEnum.RESTRICTIONS_EDIT)) {
    return null
  }

  return (
    <RestrictionsOptionsDropdown.Root>
      <RestrictionsOptionsDropdown.Trigger />
      <RestrictionsOptionsDropdown.Menu>
        <RestrictionsOptionsDropdown.Item>
          <RestrictionModalTrigger.Patch />
        </RestrictionsOptionsDropdown.Item>
      </RestrictionsOptionsDropdown.Menu>
    </RestrictionsOptionsDropdown.Root>
  )
}
