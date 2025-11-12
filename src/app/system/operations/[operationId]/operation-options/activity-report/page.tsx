import { subMonths } from 'date-fns'
import { ActivityReportForm } from '@/modules/activity-report/presentation/components/activity-report-form'
import { TableActivityReport } from '@/modules/activity-report/presentation/components/table-activity-report'
import { ActivityReportOptionsDropdown } from '@/modules/activity-report/presentation/components/activity-report-options-dropdown'
import { ActivityReportFiltersDropdown } from '@/modules/activity-report/presentation/components/activity-report-filters-dropdown'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { SystemPagination } from '@/modules/shared/presentation/components/system-pagination'
import { MESSAGES_ACTIVITY_REPORT } from '@/modules/shared/presentation/messages/activity-report'

import { ActionSection } from '@/modules/system/presentation/components/actions-section'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import {
  formatDateOnly,
  formatTimeOnly
} from '@/modules/shared/presentation/utils/formatted.utils'
import { auth } from '@/auth'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'

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
        start: formatTimeOnly(0, 0),
        end: formatTimeOnly(23, 59)
      }
    },
    pagination: {
      per_page: 50,
      page: 1
    }
  }

  return (
    <ActivityReportForm.Form initSettings={initialSettingsLogs}>
      <main className="flex flex-col flex-1 h-full w-full p-8 sm:p-10 sm:pb-0 gap-5">
        <HeaderSection.Root>
          <HeaderSection.Title>{data.title}</HeaderSection.Title>
          <HeaderSection.Description>
            {data.description}
          </HeaderSection.Description>
        </HeaderSection.Root>

        <Separator orientation="horizontal" />

        <ActionSection.Root>
          <ActivityReportForm.Inputs.Search />
          <ActivityReportFiltersDropdown.Client
            isAdmin={isAdmin}
            permissions={userPermissions}
          />
        </ActionSection.Root>

        <div className="flex flex-col h-full w-full">
          <TableActivityReport.Root>
            <TableActivityReport.Header />
            <TableActivityReport.Body initSettings={initialSettingsLogs}>
              <TableActivityReport.Item>
                <ActivityReportOptionsDropdown.Client />
              </TableActivityReport.Item>
            </TableActivityReport.Body>
          </TableActivityReport.Root>

          <Separator orientation="horizontal" />

          <SystemPagination.Root>
            <SystemPagination.Controls />
          </SystemPagination.Root>
        </div>
      </main>
    </ActivityReportForm.Form>
  )
}
