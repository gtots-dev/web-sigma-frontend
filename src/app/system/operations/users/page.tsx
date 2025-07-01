'use client'

import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { TableUsers } from '@/modules/users/presentation/components/table-users'
import { UserOptionsDropdown } from '@/modules/users/presentation/components/user-options-dropdown'
import { AddUserMenuComponent } from '@/modules/users/presentation/components/add-user-menu/add-user-menu.component'
import { AddUserMenu } from '@/modules/users/presentation/components/add-user-menu'
import { EditUserMenu } from '@/modules/users/presentation/components/edit-user-menu'
import { EditUserMenuComponent } from '@/modules/users/presentation/components/edit-user-menu/edit-user-menu.component'
import { ViewMoreUserMenu } from '@/modules/users/presentation/components/view-more-user-menu'
import { ViewMoreUserMenuComponent } from '@/modules/users/presentation/components/view-more-user-menu/view-more-user-menu.component'
import { PutUserPasswordResetMenuComponent } from '@/modules/users/presentation/components/put-user-password-reset-menu/put-user-password-reset-menu.component'
import { PutUserPasswordResetMenu } from '@/modules/users/presentation/components/put-user-password-reset-menu'
import { MESSAGES_PASSWORD_RESET } from '@/modules/shared/presentation/messages/password-reset'
import { BindUserWithPermissionProfilesMenuComponent } from '@/modules/users/presentation/components/bind-user-with-permission-profiles-menu/bind-user-with-permission-profiles-menu.component'
import { BindUserWithPermissionProfilesMenu } from '@/modules/users/presentation/components/bind-user-with-permission-profiles-menu'

interface Data {
  title: string
  description: string
  menuAddUserTitle: string
  menuAddUserDescription: string
  menuEditUserTitle: string
  menuEditUserDescription: string
  menuViewMoreUserTitle: string
  menuViewMoreUserDescription: string
  menuPasswordResetUserTitle: string
  menuPasswordResetUserDescription: string
  menuBindUserWithPermissionProfilesTitle: string
  menuBindUserWithPermissionProfilesDescription: string
}

export default function UsersPage() {
  const data: Data = {
    title: MESSAGES_USERS['5.1'],
    description: MESSAGES_USERS['5.2'],
    menuAddUserTitle: MESSAGES_USERS['5.4'],
    menuAddUserDescription: MESSAGES_USERS['5.5'],
    menuEditUserTitle: MESSAGES_USERS['5.29'],
    menuEditUserDescription: MESSAGES_USERS['5.30'],
    menuViewMoreUserTitle: MESSAGES_USERS['5.27'],
    menuViewMoreUserDescription: MESSAGES_USERS['5.28'],
    menuPasswordResetUserTitle: MESSAGES_PASSWORD_RESET['2.14'],
    menuPasswordResetUserDescription: MESSAGES_PASSWORD_RESET['2.15'],
    menuBindUserWithPermissionProfilesTitle: MESSAGES_PASSWORD_RESET['2.16'],
    menuBindUserWithPermissionProfilesDescription:
      MESSAGES_PASSWORD_RESET['2.17']
  }

  return (
    <main className="flex flex-col flex-1 p-8 sm:p-10 sm:pb-0 gap-5">
      <HeaderSection.Root>
        <HeaderSection.Title>{data.title}</HeaderSection.Title>
        <HeaderSection.Description>
          {data.description}
        </HeaderSection.Description>
      </HeaderSection.Root>
      <Separator orientation="horizontal" />
      <ActionSection.Root>
        <AddUserMenu.Provider>
          <AddUserMenu.Trigger />
          <AddUserMenuComponent
            title={data.menuAddUserTitle}
            description={data.menuAddUserDescription}
          />
        </AddUserMenu.Provider>
      </ActionSection.Root>
      <TableUsers.Root>
        <TableUsers.Header />
        <TableUsers.Body>
          <TableUsers.Item>
            <BindUserWithPermissionProfilesMenu.Provider>
              <ViewMoreUserMenu.Provider>
                <EditUserMenu.Provider>
                  <PutUserPasswordResetMenu.Provider>
                    <UserOptionsDropdown.Root>
                      <UserOptionsDropdown.Trigger />
                      <UserOptionsDropdown.Menu>
                        <UserOptionsDropdown.Item>
                          <ViewMoreUserMenu.Trigger />
                        </UserOptionsDropdown.Item>
                        <UserOptionsDropdown.Item>
                          <EditUserMenu.Trigger />
                        </UserOptionsDropdown.Item>
                        <UserOptionsDropdown.Item>
                          <BindUserWithPermissionProfilesMenu.Trigger />
                        </UserOptionsDropdown.Item>
                        <UserOptionsDropdown.Item>
                          <PutUserPasswordResetMenu.Trigger />
                        </UserOptionsDropdown.Item>
                      </UserOptionsDropdown.Menu>
                    </UserOptionsDropdown.Root>
                    <BindUserWithPermissionProfilesMenuComponent
                      title={data.menuBindUserWithPermissionProfilesTitle}
                      description={
                        data.menuBindUserWithPermissionProfilesDescription
                      }
                    />
                    <ViewMoreUserMenuComponent
                      title={data.menuViewMoreUserTitle}
                      description={data.menuViewMoreUserDescription}
                    />
                    <PutUserPasswordResetMenuComponent
                      title={data.menuPasswordResetUserTitle}
                      description={data.menuPasswordResetUserDescription}
                    />
                    <EditUserMenuComponent
                      title={data.menuEditUserTitle}
                      description={data.menuEditUserDescription}
                    />
                  </PutUserPasswordResetMenu.Provider>
                </EditUserMenu.Provider>
              </ViewMoreUserMenu.Provider>
            </BindUserWithPermissionProfilesMenu.Provider>
          </TableUsers.Item>
        </TableUsers.Body>
      </TableUsers.Root>
    </main>
  )
}
