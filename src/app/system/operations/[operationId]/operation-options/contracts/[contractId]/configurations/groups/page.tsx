import { GroupOptionsDropdown } from '@/modules/groups/presentation/components/group-options-dropdown'
import { GroupModalTrigger } from '@/modules/groups/presentation/components/group-modal-triggers'
import { TableGroups } from '@/modules/groups/presentation/components/table-groups'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_GROUP } from '@/modules/shared/presentation/messages/groups'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { getOperationAuthContext } from '@/modules/system/presentation/contexts/get-operation-auth.context'

interface GroupsPageProps {
  params: Promise<UrlParams>
}

export default async function GroupsPage({ params }: GroupsPageProps) {
  const { operationId: rawOperationId, contractId: rawContractId } =
    await params
  const { isAdmin, userPermissions, hasPermission } =
    await getOperationAuthContext(rawOperationId)

  const previousSection = `/system/operations/${rawOperationId}/operation-options/contracts/${rawContractId}/configurations`

  return (
    <main className="flex flex-col flex-1 p-8 sm:p-10 gap-5">
      <HeaderSection.Root>
        <SectionRedirectLink.Button href={previousSection} />
        <Separator
          orientation="vertical"
          className="h-5 shrink-0 hidden sm:block"
        />
        <div className="flex flex-col min-w-0 flex-1">
          <HeaderSection.Title>{MESSAGES_GROUP['18.1']}</HeaderSection.Title>
          <HeaderSection.Description>
            {MESSAGES_GROUP['18.2']}
          </HeaderSection.Description>
        </div>
      </HeaderSection.Root>

      {hasPermission(PermissionEnum.GROUPS_EDIT) && (
        <ActionSection.Root>
          <GroupModalTrigger.Post />
        </ActionSection.Root>
      )}

      <TableGroups.Root>
        <TableGroups.Header />
        <TableGroups.Body>
          <TableGroups.Item>
            <GroupOptionsDropdown.Client
              isAdmin={isAdmin}
              permissions={userPermissions}
            />
          </TableGroups.Item>
        </TableGroups.Body>
      </TableGroups.Root>
    </main>
  )
}
