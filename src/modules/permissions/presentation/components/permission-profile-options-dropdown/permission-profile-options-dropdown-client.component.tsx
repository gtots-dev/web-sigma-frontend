'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { EditPermissionProfileMenu } from '../edit-permission-profile-menu'
import { EditPermissionProfileMenuComponent } from '../edit-permission-profile-menu/edit-permission-profile-menu.component'
import { PermissionProfileOptionsDropdown } from '.'
import { PutPermissionProfileStatusMenuComponent } from '../put-permission-profile-status-menu/put-permission-profile-status-menu.component'
import { PutPermissionProfileStatusMenu } from '../put-permission-profile-status-menu'

export function PermissionProfileOptionsDropdownClientComponent({
  isAdmin,
  editTitle,
  editDescription,
  permissionProfileTitle,
  permissionProfileDescription,
  permissions
}: {
  isAdmin: boolean
  editTitle: string
  editDescription: string
  permissionProfileTitle: string
  permissionProfileDescription: string
  permissions: Set<PermissionEnum>
}) {
  return (
    <>
      {(isAdmin || permissions.has(PermissionEnum.PERMISSIONS_EDIT)) && (
        <EditPermissionProfileMenu.Provider>
          <PutPermissionProfileStatusMenu.Provider>
            <PermissionProfileOptionsDropdown.Root>
              <PermissionProfileOptionsDropdown.Trigger />
              <PermissionProfileOptionsDropdown.Menu>
                <PermissionProfileOptionsDropdown.Item>
                  <EditPermissionProfileMenu.Trigger />
                </PermissionProfileOptionsDropdown.Item>

                {(isAdmin ||
                  permissions.has(
                    PermissionEnum.PERMISSIONS_ENABLE_AND_DISABLE
                  )) && (
                  <PermissionProfileOptionsDropdown.Item>
                    <PutPermissionProfileStatusMenu.Trigger />
                  </PermissionProfileOptionsDropdown.Item>
                )}
              </PermissionProfileOptionsDropdown.Menu>
            </PermissionProfileOptionsDropdown.Root>

            {(isAdmin ||
              permissions.has(
                PermissionEnum.PERMISSIONS_ENABLE_AND_DISABLE
              )) && (
              <PutPermissionProfileStatusMenuComponent
                title={permissionProfileTitle}
                description={permissionProfileDescription}
              />
            )}

            <EditPermissionProfileMenuComponent
              title={editTitle}
              description={editDescription}
            />
          </PutPermissionProfileStatusMenu.Provider>
        </EditPermissionProfileMenu.Provider>
      )}
    </>
  )
}
