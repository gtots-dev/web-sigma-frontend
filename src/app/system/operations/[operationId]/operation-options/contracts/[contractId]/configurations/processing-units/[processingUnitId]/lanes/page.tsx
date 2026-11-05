import { LaneOptionsDropdown } from '@/modules/lanes/presentation/components/lane-options-dropdown'
import { LaneModalTrigger } from '@/modules/lanes/presentation/components/lane-modal-triggers'
import { TableLanes } from '@/modules/lanes/presentation/components/table-lanes'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_LANE } from '@/modules/shared/presentation/messages/lanes'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { getOperationAuthContext } from '@/modules/system/presentation/contexts/get-operation-auth.context'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'

interface LanesPageProps {
  params: Promise<UrlParams>
}

export default async function LanesPage({ params }: LanesPageProps) {
  const { operationId: rawOperationId, contractId: rawContractId } =
    await params
  const { isAdmin, userPermissions, hasPermission } =
    await getOperationAuthContext(rawOperationId)

  const previousSection = `/system/operations/${rawOperationId}/operation-options/contracts/${rawContractId}/configurations/processing-units`

  return (
    <main className="flex flex-col flex-1 p-8 sm:p-10 gap-5">
      <HeaderSection.Root>
        <SectionRedirectLink.Button href={previousSection} />
        <Separator
          orientation="vertical"
          className="h-5 shrink-0 hidden sm:block"
        />
        <div className="flex flex-col min-w-0 flex-1">
          <HeaderSection.Title>{MESSAGES_LANE['8.1']}</HeaderSection.Title>
          <HeaderSection.Description>
            {MESSAGES_LANE['8.2']}
          </HeaderSection.Description>
        </div>
      </HeaderSection.Root>

      {hasPermission(PermissionEnum.LANES_EDIT) && (
        <ActionSection.Root>
          <LaneModalTrigger.Post />
        </ActionSection.Root>
      )}
      <TableLanes.Root>
        <TableLanes.Header />
        <TableLanes.Body>
          <TableLanes.Item>
            <LaneOptionsDropdown.Client
              isAdmin={isAdmin}
              permissions={userPermissions}
            />
          </TableLanes.Item>
        </TableLanes.Body>
      </TableLanes.Root>
    </main>
  )
}
