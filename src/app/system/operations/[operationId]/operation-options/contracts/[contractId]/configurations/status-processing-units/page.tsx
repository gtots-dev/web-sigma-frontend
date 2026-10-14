import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { MESSAGES_STATUS_PROCESSING_UNITS } from '@/modules/shared/presentation/messages/status-processing-units'
import { TableStatusProcessingUnits } from '@/modules/status-processing-units/presentation/components/table-status-processing-units'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { auth } from '@/auth'

interface StatusProcessingUnitsPageProps {
  params: Promise<UrlParams>
}

export default async function StatusProcessingUnitsPage({
  params
}: StatusProcessingUnitsPageProps) {
  const [
    {
      token: JWT,
      user: { isAdmin }
    },
    { operationId: rawOperationId, contractId: rawContractId }
  ] = await Promise.all([auth(), params])
  const { userPermissions } = await loadAuthContext(JWT, rawOperationId)

  return (
    <main className="flex flex-col flex-1 p-8 sm:p-10 gap-5">
      <HeaderSection.Root>
        <SectionRedirectLink.Button
          href={PATHNAMES.CONTRACTS_CONFIGURATIONS(
            Number(rawOperationId),
            Number(rawContractId)
          )}
        />
        <Separator
          orientation="vertical"
          className="h-5 shrink-0 hidden sm:block"
        />
        <div className="flex flex-col min-w-0 flex-1">
          <HeaderSection.Title>
            {MESSAGES_STATUS_PROCESSING_UNITS['25.1']}
          </HeaderSection.Title>
          <HeaderSection.Description>
            {MESSAGES_STATUS_PROCESSING_UNITS['25.2']}
          </HeaderSection.Description>
        </div>
      </HeaderSection.Root>

      <TableStatusProcessingUnits.Root>
        <TableStatusProcessingUnits.Header />
        <TableStatusProcessingUnits.Body>
          <TableStatusProcessingUnits.Item />
        </TableStatusProcessingUnits.Body>
      </TableStatusProcessingUnits.Root>
    </main>
  )
}
