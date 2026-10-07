import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { TableContracts } from '@/modules/contracts/presentation/components/table-contracts'
import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'
import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { ContractOptionsDropdown } from '@/modules/contracts/presentation/components/contract-options-dropdown'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { auth } from '@/auth'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { ContractModalTrigger } from '@/modules/contracts/presentation/components/contract-modal-triggers'

interface ContractsPageProps {
  params: Promise<UrlParams>
}

export default async function ContractsPage({ params }: ContractsPageProps) {
  const results = await Promise.all([auth(), params])
  const session = results[0]
  const resolvedParams = results[1]
  const JWT = session?.token
  const isAdmin = session?.user?.isAdmin ?? false
  const rawOperationId = resolvedParams.operationId

  const { userPermissions } = await loadAuthContext(JWT, rawOperationId)

  const previousSection = `/system/operations/${rawOperationId}/operation-options`
  const hasViewPermission =
    isAdmin || userPermissions.has(PermissionEnum.CONTRACTS_VIEW)

  if (!hasViewPermission) {
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
              {MESSAGES_CONTRACTS['3.1']}
            </HeaderSection.Title>
            <HeaderSection.Description>
              {MESSAGES_CONTRACTS['3.2']}
            </HeaderSection.Description>
          </div>
        </HeaderSection.Root>
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400">
            {MESSAGES_CONTRACTS['3.22']}
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col flex-1 p-8 sm:p-10 gap-5">
      <HeaderSection.Root>
        <SectionRedirectLink.Button href={previousSection} />
        <Separator
          orientation="vertical"
          className="h-5 shrink-0 hidden sm:block"
        />
        <div className="flex flex-col min-w-0 flex-1">
          <HeaderSection.Title>{MESSAGES_CONTRACTS['3.1']}</HeaderSection.Title>
          <HeaderSection.Description>
            {MESSAGES_CONTRACTS['3.2']}
          </HeaderSection.Description>
        </div>
      </HeaderSection.Root>

      {(isAdmin || userPermissions.has(PermissionEnum.CONTRACTS_EDIT)) && (
        <ActionSection.Root>
          <ContractModalTrigger.Post />
        </ActionSection.Root>
      )}

      <TableContracts.Root>
        <TableContracts.Header />
        <TableContracts.Body>
          <TableContracts.Item>
            {isAdmin ||
            userPermissions.has(PermissionEnum.CONTRACTS_EDIT) ||
            userPermissions.has(PermissionEnum.CONTRACTS_ENABLE_AND_DISABLE) ? (
              <ContractOptionsDropdown.Root>
                <ContractOptionsDropdown.Trigger />
                <ContractOptionsDropdown.Menu>
                  {(isAdmin ||
                    userPermissions.has(PermissionEnum.CONTRACTS_EDIT)) && (
                    <ContractOptionsDropdown.Item>
                      <ContractModalTrigger.Patch />
                    </ContractOptionsDropdown.Item>
                  )}

                  {(isAdmin ||
                    userPermissions.has(
                      PermissionEnum.CONTRACTS_ENABLE_AND_DISABLE
                    )) && (
                    <ContractOptionsDropdown.Item>
                      <ContractModalTrigger.PutStatus />
                    </ContractOptionsDropdown.Item>
                  )}
                </ContractOptionsDropdown.Menu>
              </ContractOptionsDropdown.Root>
            ) : null}
          </TableContracts.Item>
        </TableContracts.Body>
      </TableContracts.Root>
    </main>
  )
}
