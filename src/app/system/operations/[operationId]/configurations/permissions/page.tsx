import { PermissionProfileOptionsDropdown } from '@/modules/permissions/presentation/components/permission-profile-options-dropdown'
import { PermissionProfileModalTrigger } from '@/modules/permissions/presentation/components/permission-profile-modal-triggers'
import { TablePermissionProfiles } from '@/modules/permissions/presentation/components/table-permission-profiles'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_PERMISSIONS } from '@/modules/shared/presentation/messages/permissions'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { getOperationAuthContext } from '@/modules/system/presentation/contexts/get-operation-auth.context'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'

interface PermissionsPageProps {
  params: Promise<UrlParams>
}

export default async function PermissionsPage({
  params
}: PermissionsPageProps) {
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
          <HeaderSection.Title>
            {MESSAGES_PERMISSIONS['6.1']}
          </HeaderSection.Title>
          <HeaderSection.Description>
            {MESSAGES_PERMISSIONS['6.2']}
          </HeaderSection.Description>
        </div>
      </HeaderSection.Root>

      {hasPermission(PermissionEnum.PERMISSIONS_EDIT) && (
        <ActionSection.Root>
          <PermissionProfileModalTrigger.Post />
        </ActionSection.Root>
      )}
      <TablePermissionProfiles.Root>
        <TablePermissionProfiles.Header />
        <TablePermissionProfiles.Body>
          <TablePermissionProfiles.Item>
            <PermissionProfileOptionsDropdown.Client
              isAdmin={isAdmin}
              permissions={userPermissions}
            />
          </TablePermissionProfiles.Item>
        </TablePermissionProfiles.Body>
      </TablePermissionProfiles.Root>
    </main>
  )
}
