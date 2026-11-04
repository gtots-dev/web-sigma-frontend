import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { MESSAGES_VIOLATIONS } from '@/modules/shared/presentation/messages/violations'
import { TableViolations } from '@/modules/violations/presentation/components/table-violations'
import { ViolationsOptionsDropdownClient } from '@/modules/violations/presentation/components/violations-options-dropdown/violations-options-dropdown-client.component'
import { getOperationAuthContext } from '@/modules/system/presentation/contexts/get-operation-auth.context'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'

interface ViolationsPageProps {
  params: Promise<UrlParams>
}

export default async function ViolationsPage({ params }: ViolationsPageProps) {
  const { operationId: rawOperationId, contractId: rawContractId } =
    await params
  const { isAdmin, userPermissions } =
    await getOperationAuthContext(rawOperationId)

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
            {MESSAGES_VIOLATIONS['23.1']}
          </HeaderSection.Title>
          <HeaderSection.Description>
            {MESSAGES_VIOLATIONS['23.2']}
          </HeaderSection.Description>
        </div>
      </HeaderSection.Root>

      <TableViolations.Root>
        <TableViolations.Header />
        <TableViolations.Body>
          <TableViolations.Item>
            <ViolationsOptionsDropdownClient
              isAdmin={isAdmin}
              permissions={userPermissions}
            />
          </TableViolations.Item>
        </TableViolations.Body>
      </TableViolations.Root>
    </main>
  )
}
