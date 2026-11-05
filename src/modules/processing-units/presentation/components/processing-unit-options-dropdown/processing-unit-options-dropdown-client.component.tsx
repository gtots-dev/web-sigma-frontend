'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { ProcessingUnitsOptionsDropdown } from '.'
import { ProcessingUnitModalTrigger } from '../processing-unit-modal-triggers'

export function ProcessingUnitsOptionsDropdownClient({
  isAdmin,
  permissions
}: {
  isAdmin: boolean
  permissions: Set<PermissionEnum>
}) {
  const canEdit =
    isAdmin || permissions.has(PermissionEnum.PROCESSING_UNITS_EDIT)
  const canToggleStatus =
    isAdmin ||
    permissions.has(PermissionEnum.PROCESSING_UNITS_ENABLE_AND_DISABLE)

  if (!canEdit && !canToggleStatus) {
    return null
  }

  return (
    <ProcessingUnitsOptionsDropdown.Root>
      <ProcessingUnitsOptionsDropdown.Trigger />

      <ProcessingUnitsOptionsDropdown.Menu>
        {canEdit && (
          <ProcessingUnitsOptionsDropdown.Item>
            <ProcessingUnitModalTrigger.Patch />
          </ProcessingUnitsOptionsDropdown.Item>
        )}

        {canToggleStatus && (
          <ProcessingUnitsOptionsDropdown.Item>
            <ProcessingUnitModalTrigger.PatchStatus />
          </ProcessingUnitsOptionsDropdown.Item>
        )}
      </ProcessingUnitsOptionsDropdown.Menu>
    </ProcessingUnitsOptionsDropdown.Root>
  )
}
