'use client'

import { MonitoringItem } from '../../../domain/interfaces/monitoring-item.interface'
import { useMenuStatus } from '../../hooks/use-menu-status.hook'

interface MonitoringMenuAccentBarProps {
  status: MonitoringItem['status']
}

export function MonitoringMenuAccentBar({ status }: MonitoringMenuAccentBarProps) {
  const { accent } = useMenuStatus(status)
  return (
    <div className={`absolute top-0 left-0 w-full h-1 ${accent}`} />
  )
}
