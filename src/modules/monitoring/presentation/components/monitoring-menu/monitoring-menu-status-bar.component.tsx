'use client'

import { MonitoringItem } from '../../../domain/interfaces/monitoring-item.interface'
import { useMenuStatus } from '../../hooks/use-menu-status.hook'

interface MonitoringMenuStatusBarProps {
  status: MonitoringItem['status']
}

export function MonitoringMenuStatusBar({ status }: MonitoringMenuStatusBarProps) {
  const { bar, width } = useMenuStatus(status)
  return (
    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
      <div className={`h-full transition-all duration-1000 ${bar} ${width}`} />
    </div>
  )
}
