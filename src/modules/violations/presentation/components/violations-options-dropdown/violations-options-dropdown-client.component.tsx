'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { PatchViolationMenu } from '../patch-violation-menu'
import { ViolationsOptionsDropdown } from '.'
import { PatchViolationMenuComponent } from '../patch-violation-menu/patch-violation-menu.component'

export function ViolationsOptionsDropdownClient({
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
    <PatchViolationMenu.Provider>
      {isAdmin || permissions.has(PermissionEnum.VIOLATIONS_EDIT) ? (
        <ViolationsOptionsDropdown.Root>
          <ViolationsOptionsDropdown.Trigger />
          <ViolationsOptionsDropdown.Menu>
            <ViolationsOptionsDropdown.Item>
              <PatchViolationMenu.Trigger />
            </ViolationsOptionsDropdown.Item>
          </ViolationsOptionsDropdown.Menu>
        </ViolationsOptionsDropdown.Root>
      ) : null}

      {(isAdmin || permissions.has(PermissionEnum.VIOLATIONS_EDIT)) && (
        <PatchViolationMenuComponent
          title={patchTitle}
          description={patchDescription}
        />
      )}
    </PatchViolationMenu.Provider>
  )
}
