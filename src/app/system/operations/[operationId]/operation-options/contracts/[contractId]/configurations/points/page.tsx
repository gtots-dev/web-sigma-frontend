import { PointOptionsDropdown } from '@/modules/points/presentation/components/point-options-dropdown'
import { PointModalTrigger } from '@/modules/points/presentation/components/point-modal-triggers'
import { TablePoints } from '@/modules/points/presentation/components/table-points'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_POINT } from '@/modules/shared/presentation/messages/points'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { getOperationAuthContext } from '@/modules/system/presentation/contexts/get-operation-auth.context'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'

interface PointsPageProps {
  params: Promise<UrlParams>
}

export default async function PointsPage({ params }: PointsPageProps) {
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
          <HeaderSection.Title>{MESSAGES_POINT['14.1']}</HeaderSection.Title>
          <HeaderSection.Description>
            {MESSAGES_POINT['14.2']}
          </HeaderSection.Description>
        </div>
      </HeaderSection.Root>

      {hasPermission(PermissionEnum.POINTS_EDIT) && (
        <ActionSection.Root>
          <PointModalTrigger.Post />
        </ActionSection.Root>
      )}
      <TablePoints.Root>
        <TablePoints.Header />
        <TablePoints.Body>
          <TablePoints.Item>
            <PointOptionsDropdown.Client
              isAdmin={isAdmin}
              permissions={userPermissions}
            />
          </TablePoints.Item>
        </TablePoints.Body>
      </TablePoints.Root>
    </main>
  )
}
