'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { EditPermissionProfileMenu } from '../edit-permission-profile-menu'
import { EditPermissionProfileMenuComponent } from '../edit-permission-profile-menu/edit-permission-profile-menu.component'
import { PermissionProfileOptionsDropdown } from '.'

export function PermissionProfileOptionsDropdownClientComponent({
  isAdmin,
  editTitle,
  editDescription,
  permissions
}: {
  isAdmin: boolean
  editTitle: string
  editDescription: string
  permissions: Set<PermissionEnum>
}) {
  return (
    <>
      {(isAdmin || permissions.has(PermissionEnum.PERMISSIONS_EDIT)) && (
        <EditPermissionProfileMenu.Provider>
          <PermissionProfileOptionsDropdown.Root>
            <PermissionProfileOptionsDropdown.Trigger />
            <PermissionProfileOptionsDropdown.Menu>
              <PermissionProfileOptionsDropdown.Item>
                <EditPermissionProfileMenu.Trigger />
              </PermissionProfileOptionsDropdown.Item>
            </PermissionProfileOptionsDropdown.Menu>
          </PermissionProfileOptionsDropdown.Root>
          <EditPermissionProfileMenuComponent
            title={editTitle}
            description={editDescription}
          />
        </EditPermissionProfileMenu.Provider>
      )}
    </>
  )
}
