import { useEffect, useState } from 'react'
import { useActivityReportStore } from '../stores/activity-report.store'
import type { ActivityReportInterface } from '../../domain/interfaces/activity-report.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'
import type { ActivityReportFiltersInterface } from '../../domain/interfaces/activity-report-filters.interface'

export interface UseTableActivityReportResult {
  logs: { data: ActivityReportInterface[]; meta: PaginationInterface }
  loading: boolean
}

export function useTableActivityReport(initSettings: {
  filters: ActivityReportFiltersInterface
  pagination: PaginationInterface
}): UseTableActivityReportResult {
  const { getActivityReport, logs } = useActivityReportStore()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchActivityReport = async () => {
      setLoading(true)
      await getActivityReport(initSettings)
      setLoading(false)
    }

    fetchActivityReport()
  }, [initSettings, getActivityReport])

  return { logs, loading }
}
