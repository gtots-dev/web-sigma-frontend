'use client'

import { SystemFilters } from '@/modules/shared/presentation/components/system-filters'
import { useActivityReportFilterResolver } from '../../hooks/use-activity-report-filter-resolver.hook'

export function ActivityReportFiltersToggleComponent() {
  const { filterLabels, handleValueResolver } =
    useActivityReportFilterResolver()

  return (
    <SystemFilters.Toggle
      labels={filterLabels}
      valueResolver={handleValueResolver}
    />
  )
}
