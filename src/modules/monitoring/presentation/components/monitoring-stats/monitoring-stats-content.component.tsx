'use client'

import { useMonitoringStats } from '../../hooks/use-monitoring-stats.hook'
import { MonitoringStatsItem } from './monitoring-stats-item.component'

export function MonitoringStatsContent() {
  const { filteredCount, totalCount } = useMonitoringStats()

  return (
    <div className="flex items-center gap-3 p-1.5 select-none">
      <div className="flex items-center gap-2">
        <MonitoringStatsItem value={filteredCount} label="Exibidos" variant="primary" />
        <MonitoringStatsItem value={totalCount} label="Total" variant="muted" />
      </div>
    </div>
  )
}
