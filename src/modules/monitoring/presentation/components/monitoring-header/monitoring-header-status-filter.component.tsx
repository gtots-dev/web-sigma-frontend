'use client'

import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  LayoutGrid,
  Filter
} from 'lucide-react'
import { MonitoringStatus } from '../../../domain/interfaces/monitoring-cell.interface'
import { SingleSelect } from '@/modules/shared/presentation/components/single-select/single-select.component'

export function MonitoringHeaderFilter() {
  const { statusFilter, setStatusFilter } = useMonitoringContext()

  const filters = [
    {
      id: 'all',
      label: 'Todas as Condições',
      icon: LayoutGrid,
      color: 'text-muted-foreground',
      colorValue: 'rgb(113, 113, 122)'
    },
    {
      id: 'ok',
      label: 'Normal',
      icon: CheckCircle2,
      color: 'text-[rgb(var(--monitoring-ok))]',
      colorValue: 'rgb(var(--monitoring-ok))'
    },
    {
      id: 'warning',
      label: 'Atenção',
      icon: AlertCircle,
      color: 'text-[rgb(var(--monitoring-warning))]',
      colorValue: 'rgb(var(--monitoring-warning))'
    },
    {
      id: 'error',
      label: 'Crítico',
      icon: XCircle,
      color: 'text-[rgb(var(--monitoring-error))]',
      colorValue: 'rgb(var(--monitoring-error))'
    }
  ]

  const activeFilter = filters.find((f) => f.id === statusFilter) || filters[0]

  return (
    <SingleSelect
      items={filters}
      value={statusFilter}
      onChange={(v) => setStatusFilter((v || 'all') as MonitoringStatus | 'all')}
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
