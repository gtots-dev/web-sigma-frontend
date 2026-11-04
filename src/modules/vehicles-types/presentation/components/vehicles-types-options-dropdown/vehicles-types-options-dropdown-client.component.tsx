'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { VehiclesTypesOptionsDropdown } from '.'
import { VehicleTypeModalTrigger } from '../vehicle-type-modal-triggers'

export function VehiclesTypesOptionsDropdownClient({
  isAdmin,
  permissions
}: {
  isAdmin: boolean
  permissions: Set<PermissionEnum>
}) {
  if (!isAdmin && !permissions.has(PermissionEnum.VEHICLE_TYPES_EDIT)) {
    return null
  }

  return (
    <VehiclesTypesOptionsDropdown.Root>
      <VehiclesTypesOptionsDropdown.Trigger />
      <VehiclesTypesOptionsDropdown.Menu>
        <VehiclesTypesOptionsDropdown.Item>
          <VehicleTypeModalTrigger.Patch />
        </VehiclesTypesOptionsDropdown.Item>
      </VehiclesTypesOptionsDropdown.Menu>
    </VehiclesTypesOptionsDropdown.Root>
  )
}
