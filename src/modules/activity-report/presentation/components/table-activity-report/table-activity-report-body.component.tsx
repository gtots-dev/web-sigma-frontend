'use client'

import type { ReactNode } from 'react'
import { TableBody } from '@/modules/shared/presentation/components/shadcn/table'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { TableLoading } from '@/modules/shared/presentation/components/table-addons/table-loading.component'
import { TableActivityReportContext } from '../../contexts/table-activity-report.context'
import { useTableActivityReport } from '../../hooks/use-table-activity-report.hook'
import type { ActivityReportInterface } from '@/modules/activity-report/domain/interfaces/activity-report.interface'
import type { ActivityReportFiltersInterface } from '@/modules/activity-report/domain/interfaces/activity-report-filters.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'
import { MESSAGES_ACTIVITY_REPORT } from '@/modules/shared/presentation/messages/activity-report'

import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'

export function TableActivityReportBodyComponent({
  children,
  initSettings
}: {
  children: ReactNode
  initSettings: {
    filters: ActivityReportFiltersInterface
    pagination: PaginationInterface
  }
}) {
  const { logs, loading } = useTableActivityReport(initSettings)
  const isLarge = useMediaQuery('(min-width: 1024px)')
  const isExtraLarge = useMediaQuery('(min-width: 1230px)')

  const getColSpan = () => {
    if (isExtraLarge === undefined || isLarge === undefined) return 5
    if (isExtraLarge) return 5
    if (isLarge) return 3
    return 2
  }

  const colSpan = getColSpan()

  if (loading)
    return (
      <TableBody>
        <TableLoading colSpan={colSpan} />
      </TableBody>
    )

  if (logs.data.length === 0)
    return (
      <TableBody>
        <TableMessage colSpan={colSpan} message={MESSAGES_ACTIVITY_REPORT['15.3']} />
      </TableBody>
    )

  return (
    <TableBody>
      {logs.data.map((log: ActivityReportInterface) => (
        <TableActivityReportContext.Provider key={log.id} value={log}>
          {children}
        </TableActivityReportContext.Provider>
      ))}
    </TableBody>
  )
}
