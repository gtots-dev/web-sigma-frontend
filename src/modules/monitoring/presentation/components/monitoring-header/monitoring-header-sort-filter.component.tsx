'use client'

import { useMonitoringContext } from '../monitoring/monitoring-context.component'
import {
  ArrowUpNarrowWide,
  ArrowDownNarrowWide,
  ListOrdered
} from 'lucide-react'
import { SingleSelect } from '@/modules/shared/presentation/components/single-select/single-select.component'

export function MonitoringHeaderSort() {
  const { sortMode, setSortMode } = useMonitoringContext()

  const sortOptions = [
    {
      id: 'none',
      label: 'Sem Ordenação',
      icon: ListOrdered,
      color: 'text-muted-foreground',
      colorValue: 'rgb(113, 113, 122)'
    },
    {
      id: 'highest',
      label: 'Maior Criticidade',
      icon: ArrowDownNarrowWide,
      color: 'text-[rgb(var(--monitoring-error))]',
      colorValue: 'rgb(var(--monitoring-error))'
    },
    {
      id: 'lowest',
      label: 'Maior Estabilidade',
      icon: ArrowUpNarrowWide,
      color: 'text-[rgb(var(--monitoring-ok))]',
      colorValue: 'rgb(var(--monitoring-ok))'
    }
  ]

  const activeSort =
    sortOptions.find((o) => o.id === sortMode) || sortOptions[0]

  return (
    <SingleSelect
      items={sortOptions}
      value={sortMode}
      onChange={(v) => setSortMode((v || 'none') as 'none' | 'highest' | 'lowest')}
      leftIcon={ListOrdered}
      innerIcon={activeSort.icon}
      innerIconColor={activeSort.color}
      textUppercase
      dotColor={(item) => item.colorValue}
      searchable={false}
      className="w-full md:w-[230px]"
    />
  )
}
