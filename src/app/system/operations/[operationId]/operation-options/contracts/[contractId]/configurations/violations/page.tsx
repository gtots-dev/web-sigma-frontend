import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { MESSAGES_VIOLATIONS } from '@/modules/shared/presentation/messages/violations'
import { TableViolations } from '@/modules/violations/presentation/components/table-violations'
import { ViolationsOptionsDropdownClient } from '@/modules/violations/presentation/components/violations-options-dropdown/violations-options-dropdown-client.component'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { auth } from '@/auth'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'

interface ViolationsPageProps {
  params: Promise<UrlParams>
}

export default async function ViolationsPage({ params }: ViolationsPageProps) {
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
          className="mb-5 lg:mb-0"
          href={PATHNAMES.CONTRACTS_CONFIGURATIONS(
            Number(rawOperationId),
            Number(rawContractId)
          )}
        />
        <Separator orientation="vertical" className="h-5 hidden lg:block" />
        <HeaderSection.Title>{MESSAGES_VIOLATIONS['23.1']}</HeaderSection.Title>
        <HeaderSection.Description>
          {MESSAGES_VIOLATIONS['23.2']}
        </HeaderSection.Description>
      </HeaderSection.Root>

      <TableViolations.Root>
        <TableViolations.Header />
        <TableViolations.Body>
          <TableViolations.Item>
            <ViolationsOptionsDropdownClient
              isAdmin={isAdmin}
              permissions={userPermissions}
              patchTitle={MESSAGES_VIOLATIONS['23.4']}
              patchDescription={MESSAGES_VIOLATIONS['23.5']}
            />
          </TableViolations.Item>
        </TableViolations.Body>
      </TableViolations.Root>
    </main>
  )
}
