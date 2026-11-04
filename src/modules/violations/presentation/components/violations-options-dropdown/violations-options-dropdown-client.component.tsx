'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { ViolationsOptionsDropdown } from '.'
import { ViolationModalTrigger } from '../violation-modal-triggers'

export function ViolationsOptionsDropdownClient({
  isAdmin,
  permissions
}: {
  isAdmin: boolean
  permissions: Set<PermissionEnum>
}) {
  if (!isAdmin && !permissions.has(PermissionEnum.VIOLATIONS_EDIT)) {
    return null
  }

  return (
    <ViolationsOptionsDropdown.Root>
      <ViolationsOptionsDropdown.Trigger />
      <ViolationsOptionsDropdown.Menu>
        <ViolationsOptionsDropdown.Item>
          <ViolationModalTrigger.Patch />
        </ViolationsOptionsDropdown.Item>
      </ViolationsOptionsDropdown.Menu>
    </ViolationsOptionsDropdown.Root>
  )
}
