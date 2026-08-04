import { subMonths } from 'date-fns'
import { SlidersHorizontal } from 'lucide-react'
import { ActivityReportForm } from '@/modules/activity-report/presentation/components/activity-report-form'
import { TableActivityReport } from '@/modules/activity-report/presentation/components/table-activity-report'
import { ActivityReportOptionsDropdown } from '@/modules/activity-report/presentation/components/activity-report-options-dropdown'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { SystemPagination } from '@/modules/shared/presentation/components/system-pagination'
import { MESSAGES_ACTIVITY_REPORT } from '@/modules/shared/presentation/messages/activity-report'

import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { SystemFilters } from '@/modules/shared/presentation/components/system-filters'
import { formatDateOnly } from '@/modules/shared/presentation/utils/formatted.utils'
import { auth } from '@/auth'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { ActivityReportFiltersToggle } from '@/modules/activity-report/presentation/components/activity-report-filters-toggle'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'

interface ActivityReportPageProps {
  params: Promise<UrlParams>
}

export default async function ActivityReportPage({
  params
}: ActivityReportPageProps) {
  const {
    token: JWT,
    user: { isAdmin }
  } = await auth()
  const { operationId: rawOperationId } = await params
  const { userPermissions } = await loadAuthContext(JWT, rawOperationId)

  const previousSection = PATHNAMES.OPERATION_OPTIONS(Number(rawOperationId))

  const data = {
    title: MESSAGES_ACTIVITY_REPORT['15.1'],
    description: MESSAGES_ACTIVITY_REPORT['15.2']
  }

  const today = new Date()
  const oneMonthAgo = subMonths(today, 1)

  const initialSettingsLogs = {
    filters: {
      operation_ids: [Number(rawOperationId)],
      date_range: {
        start: formatDateOnly(oneMonthAgo),
        end: formatDateOnly(today)
      },
      time_range: {
        start: null,
        end: null
      }
    },
    pagination: {
      per_page: 50,
      page: 1
    }
  }

  const showContracts =
    isAdmin || userPermissions.has(PermissionEnum.CONTRACTS_VIEW)
  const showUsers = isAdmin || userPermissions.has(PermissionEnum.USERS_VIEW)

  return (
    <ActivityReportForm.Form initSettings={initialSettingsLogs}>
      <main className="flex flex-col flex-1 w-full p-8 sm:p-10 sm:pb-0 gap-5">
        <HeaderSection.Root>
          <SectionRedirectLink.Button
            className="mb-5 lg:mb-0"
            href={previousSection}
          />
          <Separator orientation="vertical" className="h-5 hidden lg:block" />
          <HeaderSection.Title>{data.title}</HeaderSection.Title>
          <HeaderSection.Description>
            {data.description}
          </HeaderSection.Description>
        </HeaderSection.Root>

        <SystemFilters.Root>
          <SystemFilters.Header>
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <SystemFilters.Icon>
                <SlidersHorizontal className="w-4 h-4" />
              </SystemFilters.Icon>
              <div className="min-w-0 flex-1">
                <SystemFilters.Title>Filtros de Busca</SystemFilters.Title>
                <SystemFilters.Description>
                  Refine as atividades por palavra-chave, período, horário,
                  contratos e usuários
                </SystemFilters.Description>
              </div>
            </div>
            <ActivityReportFiltersToggle />
          </SystemFilters.Header>

          <SystemFilters.Body>
            <div className="flex flex-col gap-3 w-full">
              <div className="w-full">
                <ActivityReportForm.Inputs.Search />
              </div>

              {(showContracts || showUsers) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {showContracts && <ActivityReportForm.Inputs.Contracts />}
                  {showUsers && <ActivityReportForm.Inputs.Users />}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 items-center">
                <ActivityReportForm.Inputs.Date />
                <ActivityReportForm.Inputs.Time />
                <div className="flex items-center justify-end w-full lg:col-start-3">
                  <ActivityReportForm.Submit />
                </div>
              </div>
            </div>
          </SystemFilters.Body>
        </SystemFilters.Root>

        <div className="flex flex-col w-full">
          <TableActivityReport.Root>
            <TableActivityReport.Header />
            <TableActivityReport.Body initSettings={initialSettingsLogs}>
              <TableActivityReport.Item>
                <ActivityReportOptionsDropdown.Client />
              </TableActivityReport.Item>
            </TableActivityReport.Body>
          </TableActivityReport.Root>

          <SystemPagination.Root>
            <SystemPagination.Controls />
          </SystemPagination.Root>
        </div>
      </main>
    </ActivityReportForm.Form>
  )
}
