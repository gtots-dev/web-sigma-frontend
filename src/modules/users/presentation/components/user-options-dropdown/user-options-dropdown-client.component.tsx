'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { ViewMoreUserMenu } from '../view-more-user-menu'
import { EditUserMenu } from '../edit-user-menu'
import { PutUserPasswordResetMenu } from '../put-user-password-reset-menu'
import { UserOptionsDropdown } from '.'
import { ViewMoreUserMenuComponent } from '../view-more-user-menu/view-more-user-menu.component'
import { PutUserPasswordResetMenuComponent } from '../put-user-password-reset-menu/put-user-password-reset-menu.component'
import { EditUserMenuComponent } from '../edit-user-menu/edit-user-menu.component'

export function UserOptionsDropdownClient({
  viewMoreTitle,
  viewMoreDescription,
  editTitle,
  editDescription,
  resetTitle,
  resetDescription,
  permissions
}: {
  viewMoreTitle: string
  viewMoreDescription: string
  editTitle: string
  editDescription: string
  resetTitle: string
  resetDescription: string
  permissions: Set<PermissionEnum>
}) {
  return (
    <ViewMoreUserMenu.Provider>
      <EditUserMenu.Provider>
        <PutUserPasswordResetMenu.Provider>
          <UserOptionsDropdown.Root>
            <UserOptionsDropdown.Trigger />
            <UserOptionsDropdown.Menu>
              {permissions.has(PermissionEnum.USERS_EDIT) && (
                <UserOptionsDropdown.Item>
                  <EditUserMenu.Trigger />
                </UserOptionsDropdown.Item>
              )}

              <UserOptionsDropdown.Item>
                <ViewMoreUserMenu.Trigger />
              </UserOptionsDropdown.Item>

              {permissions.has(PermissionEnum.USERS_PASSWORD_RESET) && (
                <UserOptionsDropdown.Item>
                  <PutUserPasswordResetMenu.Trigger />
                </UserOptionsDropdown.Item>
              )}
            </UserOptionsDropdown.Menu>
          </UserOptionsDropdown.Root>

          <ViewMoreUserMenuComponent
            title={viewMoreTitle}
            description={viewMoreDescription}
          />

          {permissions.has(PermissionEnum.USERS_PASSWORD_RESET) && (
            <PutUserPasswordResetMenuComponent
              title={resetTitle}
              description={resetDescription}
            />
          )}

          {permissions.has(PermissionEnum.USERS_EDIT) && (
            <EditUserMenuComponent
              title={editTitle}
              description={editDescription}
            />
          )}
        </PutUserPasswordResetMenu.Provider>
      </EditUserMenu.Provider>
    </ViewMoreUserMenu.Provider>
  )
}
