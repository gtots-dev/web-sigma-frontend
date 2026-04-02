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
      <VehiclesTypesOptionsDropdown.Root>
        <VehiclesTypesOptionsDropdown.Trigger />
        <VehiclesTypesOptionsDropdown.Menu>
          {isAdmin && (
            <VehiclesTypesOptionsDropdown.Item>
              <PatchVehicleTypeMenu.Trigger />
            </VehiclesTypesOptionsDropdown.Item>
          )}
        </VehiclesTypesOptionsDropdown.Menu>
      </VehiclesTypesOptionsDropdown.Root>

      {isAdmin && (
        <PatchVehicleTypeMenuComponent
          title={patchTitle}
          description={patchDescription}
        />
      )}
    </PatchVehicleTypeMenu.Provider>
  )
}
