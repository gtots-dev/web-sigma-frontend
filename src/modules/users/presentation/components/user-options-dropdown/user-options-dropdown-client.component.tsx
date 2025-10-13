'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { ViewMoreUserMenu } from '../view-more-user-menu'
import { EditUserMenu } from '../edit-user-menu'
import { PutUserPasswordResetMenu } from '../put-user-password-reset-menu'
import { UserOptionsDropdown } from '.'
import { ViewMoreUserMenuComponent } from '../view-more-user-menu/view-more-user-menu.component'
import { PutUserPasswordResetMenuComponent } from '../put-user-password-reset-menu/put-user-password-reset-menu.component'
import { EditUserMenuComponent } from '../edit-user-menu/edit-user-menu.component'
import { BindUserWithPermissionProfilesMenu } from '../bind-user-with-permission-profiles-menu'
import { BindUserWithPermissionProfilesMenuComponent } from '../bind-user-with-permission-profiles-menu/bind-user-with-permission-profiles-menu.component'
import { PutUserStatusMenuComponent } from '../put-user-status-menu/put-user-status-menu.component'
import { PutUserStatusMenu } from '../put-user-status-menu'
import { useTableUser } from '../../contexts/table-user.context'

export function UserOptionsDropdownClient({
  userAuthenticated,
  isAdmin,
  viewMoreTitle,
  viewMoreDescription,
  editTitle,
  editDescription,
  resetTitle,
  resetDescription,
  permissions,
  bindUserWithPermissionProfilesTitle,
  bindUserWithPermissionProfilesDescription,
  userStatusTitle,
  userStatusDescription
}: {
  userAuthenticated: string
  isAdmin: boolean
  viewMoreTitle: string
  viewMoreDescription: string
  editTitle: string
  editDescription: string
  resetTitle: string
  resetDescription: string
  bindUserWithPermissionProfilesTitle: string
  bindUserWithPermissionProfilesDescription: string
  userStatusTitle: string
  userStatusDescription: string
  permissions: Set<PermissionEnum>
}) {
  const { id: userListId } = useTableUser()
  const isSameUser = userAuthenticated === String(userListId)

  return (
    <BindUserWithPermissionProfilesMenu.Provider>
      <ViewMoreUserMenu.Provider>
        <EditUserMenu.Provider>
          <PutUserPasswordResetMenu.Provider>
            <PutUserStatusMenu.Provider>
              <UserOptionsDropdown.Root>
                <UserOptionsDropdown.Trigger />
                <UserOptionsDropdown.Menu>
                  <UserOptionsDropdown.Item>
                    <ViewMoreUserMenu.Trigger />
                  </UserOptionsDropdown.Item>

                  {(isAdmin || permissions.has(PermissionEnum.USERS_EDIT)) && (
                    <UserOptionsDropdown.Item>
                      <EditUserMenu.Trigger />
                    </UserOptionsDropdown.Item>
                  )}

                  <UserOptionsDropdown.Item>
                    <BindUserWithPermissionProfilesMenu.Trigger
                      isPermittedViewContracts={
                        isAdmin ||
                        permissions.has(PermissionEnum.CONTRACTS_VIEW)
                      }
                      isPermittedViewPermissionsProfile={
                        isAdmin ||
                        permissions.has(PermissionEnum.PERMISSIONS_VIEW)
                      }
                    />
                  </UserOptionsDropdown.Item>

                  {(isAdmin ||
                    permissions.has(PermissionEnum.USERS_PASSWORD_RESET)) && (
                    <UserOptionsDropdown.Item>
                      <PutUserPasswordResetMenu.Trigger />
                    </UserOptionsDropdown.Item>
                  )}

                  {!isSameUser &&
                    (isAdmin ||
                      permissions.has(
                        PermissionEnum.USERS_ENABLE_AND_DISABLE
                      )) && (
                      <UserOptionsDropdown.Item>
                        <PutUserStatusMenu.Trigger />
                      </UserOptionsDropdown.Item>
                    )}
                </UserOptionsDropdown.Menu>
              </UserOptionsDropdown.Root>

              <ViewMoreUserMenuComponent
                title={viewMoreTitle}
                description={viewMoreDescription}
              />

              <BindUserWithPermissionProfilesMenuComponent
                title={bindUserWithPermissionProfilesTitle}
                description={bindUserWithPermissionProfilesDescription}
                isPermittedViewContracts={
                  isAdmin || permissions.has(PermissionEnum.CONTRACTS_VIEW)
                }
                isPermittedViewPermissionsProfile={
                  isAdmin || permissions.has(PermissionEnum.PERMISSIONS_VIEW)
                }
              />

              {(isAdmin ||
                permissions.has(PermissionEnum.USERS_PASSWORD_RESET)) && (
                <PutUserPasswordResetMenuComponent
                  title={resetTitle}
                  description={resetDescription}
                />
              )}

              {(isAdmin ||
                permissions.has(PermissionEnum.USERS_ENABLE_AND_DISABLE)) && (
                <PutUserStatusMenuComponent
                  title={userStatusTitle}
                  description={userStatusDescription}
                />
              )}

              {(isAdmin || permissions.has(PermissionEnum.USERS_EDIT)) && (
                <EditUserMenuComponent
                  title={editTitle}
                  description={editDescription}
                />
              )}
            </PutUserStatusMenu.Provider>
          </PutUserPasswordResetMenu.Provider>
        </EditUserMenu.Provider>
      </ViewMoreUserMenu.Provider>
    </BindUserWithPermissionProfilesMenu.Provider>
  )
}
