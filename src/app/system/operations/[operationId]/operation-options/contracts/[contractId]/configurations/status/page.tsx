import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { MESSAGES_STATUS } from '@/modules/shared/presentation/messages/status'
import { TableStatus } from '@/modules/status/presentation/components/table-status'
import { StatusRowOptions } from '@/modules/status/presentation/components/status-row-options'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { auth } from '@/auth'

interface StatusPageProps {
  params: Promise<UrlParams>
}

export default async function StatusPage({ params }: StatusPageProps) {
  const [
    {
      token: JWT,
      user: { isAdmin }
    },
    { operationId: rawOperationId, contractId: rawContractId }
  ] = await Promise.all([auth(), params])
  const { userPermissions } = await loadAuthContext(JWT, rawOperationId)

  const previousSection = PATHNAMES.CONTRACTS_CONFIGURATIONS(
    Number(rawOperationId),
    Number(rawContractId)
  )

  const canViewUps =
    isAdmin || userPermissions.has(PermissionEnum.STATUS_VIEW)
  const canEditUps =
    isAdmin || userPermissions.has(PermissionEnum.STATUS_EDIT)
  const canViewLanes =
    isAdmin || userPermissions.has(PermissionEnum.STATUS_VIEW)
  const canEditLanes =
    isAdmin || userPermissions.has(PermissionEnum.STATUS_EDIT)

  const canViewAny = canViewUps || canViewLanes

  return (
    <main className="flex flex-col flex-1 p-8 sm:p-10 gap-5">
      <HeaderSection.Root>
        <SectionRedirectLink.Button href={previousSection} />
        <Separator
          orientation="vertical"
          className="h-5 shrink-0 hidden sm:block"
        />
        <div className="flex flex-col min-w-0 flex-1">
          <HeaderSection.Title>{MESSAGES_STATUS['27.1']}</HeaderSection.Title>
          <HeaderSection.Description>
            {MESSAGES_STATUS['27.2']}
          </HeaderSection.Description>
        </div>
      </HeaderSection.Root>

      {canViewAny ? (
        <TableStatus.Root>
          <TableStatus.Header />
          <TableStatus.Body>
            <TableStatus.Item>
              <StatusRowOptions
                canEditUps={canEditUps}
                canEditLanes={canEditLanes}
              />
            </TableStatus.Item>
          </TableStatus.Body>
        </TableStatus.Root>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400">
            {MESSAGES_STATUS['27.5']}
          </p>
        </div>
      )}
    </main>
  )
}
