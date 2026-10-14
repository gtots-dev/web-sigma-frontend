import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { MESSAGES_STATUS_LANES } from '@/modules/shared/presentation/messages/status-lanes'
import { TableStatusLanes } from '@/modules/status-lanes/presentation/components/table-status-lanes'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { auth } from '@/auth'

interface StatusLanesPageProps {
  params: Promise<UrlParams>
}

export default async function StatusLanesPage({
  params
}: StatusLanesPageProps) {
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
            {MESSAGES_STATUS_LANES['26.1']}
          </HeaderSection.Title>
          <HeaderSection.Description>
            {MESSAGES_STATUS_LANES['26.2']}
          </HeaderSection.Description>
        </div>
      </HeaderSection.Root>

      <TableStatusLanes.Root>
        <TableStatusLanes.Header />
        <TableStatusLanes.Body>
          <TableStatusLanes.Item />
        </TableStatusLanes.Body>
      </TableStatusLanes.Root>
    </main>
  )
}
