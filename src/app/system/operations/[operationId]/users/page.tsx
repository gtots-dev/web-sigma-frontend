import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { TableUsers } from '@/modules/users/presentation/components/table-users'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { MESSAGES_PASSWORD_RESET } from '@/modules/shared/presentation/messages/password-reset'
import { auth } from '@/auth'
import { UserOptionsDropdown } from '@/modules/users/presentation/components/user-options-dropdown'
import { AddUserMenu } from '@/modules/users/presentation/components/add-user-menu'

interface UsersPageProps {
  params: Promise<{ operationId: string }>
}

export default async function UsersPage({ params }: UsersPageProps) {
  const {
    token: JWT,
    user: { isAdmin }
  } = await auth()
  const { operationId: rawOperationId } = await params
  const { userPermissions } = await loadAuthContext(JWT, rawOperationId)

  const data = {
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
    menuBindUserWithPermissionProfilesTitle: MESSAGES_USERS['5.16'],
    menuBindUserWithPermissionProfilesDescription: MESSAGES_USERS['5.17'],
    menuUserStatusTitle: MESSAGES_USERS['5.34'],
    menuUserStatusDescription: MESSAGES_USERS['5.33']
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
        <AddUserMenu.Client
          isAdmin={isAdmin}
          permissions={userPermissions}
          title={data.menuAddUserTitle}
          description={data.menuAddUserDescription}
        />
      </ActionSection.Root>

      <TableUsers.Root>
        <TableUsers.Header />
        <TableUsers.Body>
          <TableUsers.Item>
            <UserOptionsDropdown.Client
              isAdmin={isAdmin}
              permissions={userPermissions}
              viewMoreTitle={data.menuViewMoreUserTitle}
              viewMoreDescription={data.menuViewMoreUserDescription}
              editTitle={data.menuEditUserTitle}
              editDescription={data.menuEditUserDescription}
              resetTitle={data.menuPasswordResetUserTitle}
              resetDescription={data.menuPasswordResetUserDescription}
              bindUserWithPermissionProfilesTitle={
                data.menuBindUserWithPermissionProfilesTitle
              }
              bindUserWithPermissionProfilesDescription={
                data.menuBindUserWithPermissionProfilesDescription
              }
              userStatusTitle={data.menuUserStatusTitle}
              userStatusDescription={data.menuUserStatusDescription}
            />
          </TableUsers.Item>
        </TableUsers.Body>
      </TableUsers.Root>
    </main>
  )
}
