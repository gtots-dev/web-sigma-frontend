'use client'

import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import { Wifi, WifiOff, Filter } from 'lucide-react'
import { SingleSelect } from '@/modules/shared/presentation/components/single-select/single-select.component'

export function MonitoringHeaderConnectionFilter() {
  const { connectionFilter, setConnectionFilter } = useMonitoringContext()

  const filters = [
    {
      id: 'all',
      label: 'Conexão: Todas',
      icon: Wifi,
      color: 'text-muted-foreground',
      colorValue: 'rgb(113, 113, 122)'
    },
    {
      id: 'online',
      label: 'Apenas Online',
      icon: Wifi,
      color: 'text-primary-500',
      colorValue: 'rgb(59, 130, 246)'
    },
    {
      id: 'offline',
      label: 'Apenas Offline',
      icon: WifiOff,
      color: 'text-[rgb(var(--monitoring-offline))]',
      colorValue: 'rgb(var(--monitoring-offline))'
    }
  ]

  const activeFilter =
    filters.find((f) => f.id === connectionFilter) || filters[0]

  return (
    <SingleSelect
      items={filters}
      value={connectionFilter}
      onChange={(v) => setConnectionFilter((v || 'all') as 'all' | 'online' | 'offline')}
      leftIcon={Filter}
      innerIcon={activeFilter.icon}
      innerIconColor={activeFilter.color}
      textUppercase
      dotColor={(item) => item.colorValue}
      searchable={false}
      className="w-full"
    />
  )
}
