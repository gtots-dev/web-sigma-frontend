'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { PatchRestrictionMenu } from '../patch-restriction-menu'
import { RestrictionsOptionsDropdown } from '.'
import { PatchRestrictionMenuComponent } from '../patch-restriction-menu/patch-restriction-menu.component'

export function RestrictionsOptionsDropdownClient({
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
    <PatchRestrictionMenu.Provider>
      {(isAdmin || permissions.has(PermissionEnum.RESTRICTIONS_EDIT)) ? (
        <RestrictionsOptionsDropdown.Root>
          <RestrictionsOptionsDropdown.Trigger />
          <RestrictionsOptionsDropdown.Menu>
            <RestrictionsOptionsDropdown.Item>
              <PatchRestrictionMenu.Trigger />
            </RestrictionsOptionsDropdown.Item>
          </RestrictionsOptionsDropdown.Menu>
        </RestrictionsOptionsDropdown.Root>
      ) : null}

      {(isAdmin || permissions.has(PermissionEnum.RESTRICTIONS_EDIT)) && (
        <PatchRestrictionMenuComponent
          title={patchTitle}
          description={patchDescription}
        />
      )}
    </PatchRestrictionMenu.Provider>
  )
}
