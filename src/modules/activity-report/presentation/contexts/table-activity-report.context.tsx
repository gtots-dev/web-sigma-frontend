'use client'

import { createContext, useContext } from 'react'
import type { ActivityReportInterface } from '../../domain/interfaces/activity-report.interface'

export const TableActivityReportContext =
  createContext<ActivityReportInterface | null>(null)

export const useTableActivityReport = () => {
  const context = useContext(TableActivityReportContext)
  if (!context) {
    throw new Error(
      'useTableActivityReport must be used within a <TableActivityReports.Item />'
    )
  }
  return context
}
