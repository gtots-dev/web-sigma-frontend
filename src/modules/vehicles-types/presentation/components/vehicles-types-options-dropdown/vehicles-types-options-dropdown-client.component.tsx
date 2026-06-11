'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { PatchVehicleTypeMenu } from '../patch-vehicle-type-menu'
import { VehiclesTypesOptionsDropdown } from '.'
import { PatchVehicleTypeMenuComponent } from '../patch-vehicle-type-menu/patch-vehicle-type-menu.component'

export function VehiclesTypesOptionsDropdownClient({
  isAdmin,
  patchTitle,
  patchDescription,
  permissions
}: {
  isAdmin: boolean
  patchTitle: string
  patchDescription: string
  permissions: Set<PermissionEnum>
}) {
  return (
    <PatchVehicleTypeMenu.Provider>
      {(isAdmin || permissions.has(PermissionEnum.VEHICLE_TYPES_EDIT)) ? (
        <VehiclesTypesOptionsDropdown.Root>
          <VehiclesTypesOptionsDropdown.Trigger />
          <VehiclesTypesOptionsDropdown.Menu>
            <VehiclesTypesOptionsDropdown.Item>
              <PatchVehicleTypeMenu.Trigger />
            </VehiclesTypesOptionsDropdown.Item>
          </VehiclesTypesOptionsDropdown.Menu>
        </VehiclesTypesOptionsDropdown.Root>
      ) : null}

      {(isAdmin || permissions.has(PermissionEnum.VEHICLE_TYPES_EDIT)) && (
        <PatchVehicleTypeMenuComponent
          title={patchTitle}
          description={patchDescription}
        />
      )}
    </PatchVehicleTypeMenu.Provider>
  )
}
