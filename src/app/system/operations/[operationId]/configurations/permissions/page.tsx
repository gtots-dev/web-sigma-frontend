import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_PERMISSIONS } from '@/modules/shared/presentation/messages/permissions'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { TablePermissionProfiles } from '@/modules/permissions/presentation/components/table-permission-profiles'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { AddPermissionProfileMenu } from '@/modules/permissions/presentation/components/add-permission-profile-menu'
import { PermissionProfileOptionsDropdown } from '@/modules/permissions/presentation/components/permission-profile-options-dropdown'
import { auth } from '@/auth'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'

interface PermissionsPageProps {
  params: Promise<UrlParams>
}

export default async function PermissionsPage({
  params
}: PermissionsPageProps) {
  const {
    token: JWT,
    user: { isAdmin }
  } = await auth()
  const { operationId: rawOperationId } = await params
  const { userPermissions } = await loadAuthContext(JWT, rawOperationId)

  const data = {
    title: MESSAGES_PERMISSIONS['6.1'],
    description: MESSAGES_PERMISSIONS['6.2'],
    menuAddPermissionProfileTitle: MESSAGES_PERMISSIONS['6.4'],
    menuAddPermissionProfileDescription: MESSAGES_PERMISSIONS['6.5'],
    menuEditPermissionProfileTitle: MESSAGES_PERMISSIONS['6.10'],
    menuEditPermissionProfileDescription: MESSAGES_PERMISSIONS['6.11'],
    menuStatusPermissionProfileTitle: MESSAGES_PERMISSIONS['6.14'],
    menuStatusPermissionProfileDescription: MESSAGES_PERMISSIONS['6.15']
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
        <AddPermissionProfileMenu.Client
          isAdmin={isAdmin}
          permissions={userPermissions}
          title={data.menuAddPermissionProfileTitle}
          description={data.menuAddPermissionProfileDescription}
        />
      </ActionSection.Root>
      <TablePermissionProfiles.Root>
        <TablePermissionProfiles.Header />
        <TablePermissionProfiles.Body>
          <TablePermissionProfiles.Item>
            <PermissionProfileOptionsDropdown.Client
              isAdmin={isAdmin}
              permissions={userPermissions}
              editTitle={data.menuEditPermissionProfileTitle}
              editDescription={data.menuEditPermissionProfileDescription}
              permissionProfileTitle={data.menuStatusPermissionProfileTitle}
              permissionProfileDescription={
                data.menuStatusPermissionProfileDescription
              }
            />
          </TablePermissionProfiles.Item>
        </TablePermissionProfiles.Body>
      </TablePermissionProfiles.Root>
    </main>
  )
}
