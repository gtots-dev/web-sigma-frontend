import { ProcessingUnitsOptionsDropdown } from '@/modules/processing-units/presentation/components/processing-unit-options-dropdown'
import { ProcessingUnitModalTrigger } from '@/modules/processing-units/presentation/components/processing-unit-modal-triggers'
import { TabledProcessingUnits } from '@/modules/processing-units/presentation/components/table-processing-units'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_PROCESSING_UNIT } from '@/modules/shared/presentation/messages/processing-unit'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { getOperationAuthContext } from '@/modules/system/presentation/contexts/get-operation-auth.context'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'

interface ProcessingUnitsPageProps {
  params: Promise<UrlParams>
}

export default async function ProcessingUnitsPage({
  params
}: ProcessingUnitsPageProps) {
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
          <HeaderSection.Title>
            {MESSAGES_PROCESSING_UNIT['7.1']}
          </HeaderSection.Title>
          <HeaderSection.Description>
            {MESSAGES_PROCESSING_UNIT['7.2']}
          </HeaderSection.Description>
        </div>
      </HeaderSection.Root>

      {hasPermission(PermissionEnum.PROCESSING_UNITS_EDIT) && (
        <ActionSection.Root>
          <ProcessingUnitModalTrigger.Post />
        </ActionSection.Root>
      )}
      <ActionSection.Root>
        <TabledProcessingUnits.Root>
          <TabledProcessingUnits.Header />
          <TabledProcessingUnits.Body>
            <TabledProcessingUnits.Item>
              <ProcessingUnitsOptionsDropdown.Client
                isAdmin={isAdmin}
                permissions={userPermissions}
              />
            </TabledProcessingUnits.Item>
          </TabledProcessingUnits.Body>
        </TabledProcessingUnits.Root>
      </ActionSection.Root>
    </main>
  )
}
