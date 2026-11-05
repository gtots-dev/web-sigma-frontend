import { auth } from '@/auth'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { TableUsers } from '@/modules/users/presentation/components/table-users'
import { UserOptionsDropdown } from '@/modules/users/presentation/components/user-options-dropdown'
import { UserModalTriggers } from '@/modules/users/presentation/components/user-modal-triggers'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { getOperationAuthContext } from '@/modules/system/presentation/contexts/get-operation-auth.context'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'

interface UsersPageProps {
  params: Promise<UrlParams>
}

export default async function UsersPage({ params }: UsersPageProps) {
  const {
    user: { id }
  } = await auth()
  const { operationId: rawOperationId } = await params
  const { isAdmin, userPermissions, hasPermission } =
    await getOperationAuthContext(rawOperationId)

  const previousSection = `/system/operations/${rawOperationId}/configurations`

  return (
    <main className="flex flex-col flex-1 p-8 sm:p-10 gap-5">
      <HeaderSection.Root>
        <SectionRedirectLink.Button href={previousSection} />
        <Separator
          orientation="vertical"
          className="h-5 shrink-0 hidden sm:block"
        />
        <div className="flex flex-col min-w-0 flex-1">
          <HeaderSection.Title>{MESSAGES_USERS['5.1']}</HeaderSection.Title>
          <HeaderSection.Description>
            {MESSAGES_USERS['5.2']}
          </HeaderSection.Description>
        </div>
      </HeaderSection.Root>

      {hasPermission(PermissionEnum.USERS_EDIT) && (
        <ActionSection.Root>
          <UserModalTriggers.Post />
        </ActionSection.Root>
      )}

      <TableUsers.Root>
        <TableUsers.Header />
        <TableUsers.Body>
          <TableUsers.Item>
            <UserOptionsDropdown.Client
              userAuthenticated={id}
              isAdmin={isAdmin}
              permissions={userPermissions}
            />
          </TableUsers.Item>
        </TableUsers.Body>
      </TableUsers.Root>
    </main>
  )
}
