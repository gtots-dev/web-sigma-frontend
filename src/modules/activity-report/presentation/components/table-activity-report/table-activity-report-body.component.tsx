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

  if (loading)
    return (
      <TableBody>
        <TableLoading colSpan={6} />
      </TableBody>
    )

  if (logs.data.length === 0)
    return (
      <TableBody>
        <TableMessage colSpan={6} message={''} />
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
