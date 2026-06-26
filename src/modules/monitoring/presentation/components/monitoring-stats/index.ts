import { MonitoringStatsRoot } from './monitoring-stats-root.component'
import { MonitoringStatsContent } from './monitoring-stats-content.component'
import { MonitoringStatsTriggerMaximized } from './monitoring-stats-trigger-maximized.component'

export const Stats = Object.assign(MonitoringStatsRoot, {
  Content: MonitoringStatsContent,
  TriggerMaximized: MonitoringStatsTriggerMaximized
})
