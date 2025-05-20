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

interface Data {
  title: string
  description: string
  menuAddUserTitle: string
  menuAddUserDescription: string
  menuEditUserTitle: string
  menuEditUserDescription: string
  menuViewMoreUserTitle: string
  menuViewMoreUserDescription: string
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
    menuViewMoreUserDescription: MESSAGES_USERS['5.28']
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
            <ViewMoreUserMenu.Provider>
              <EditUserMenu.Provider>
                <UserOptionsDropdown.Root>
                  <UserOptionsDropdown.Trigger />
                  <UserOptionsDropdown.Menu>
                    <UserOptionsDropdown.Item>
                      <EditUserMenu.Trigger />
                    </UserOptionsDropdown.Item>
                    <UserOptionsDropdown.Item>
                      <ViewMoreUserMenu.Trigger />
                    </UserOptionsDropdown.Item>
                  </UserOptionsDropdown.Menu>
                </UserOptionsDropdown.Root>
                <ViewMoreUserMenuComponent
                  title={data.menuViewMoreUserTitle}
                  description={data.menuViewMoreUserDescription}
                />
                <EditUserMenuComponent
                  title={data.menuEditUserTitle}
                  description={data.menuEditUserDescription}
                />
              </EditUserMenu.Provider>
            </ViewMoreUserMenu.Provider>
          </TableUsers.Item>
        </TableUsers.Body>
      </TableUsers.Root>
    </main>
  )
}
