'use client'

import { SlidersHorizontal } from 'lucide-react'
import { SystemFilters } from '@/modules/shared/presentation/components/system-filters'
import { useMonitoringFilterResolver } from '../../hooks/use-monitoring-filter-resolver.hook'
import type { ReactNode } from 'react'

interface MonitoringHeaderFiltersComponentProps {
  children?: ReactNode
}

export function MonitoringHeaderFiltersComponent({
  children
}: MonitoringHeaderFiltersComponentProps) {
  const { activeFilters, filterLabels, handleValueResolver } =
    useMonitoringFilterResolver()

  return (
    <SystemFilters.Root>
      <SystemFilters.Header>
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
          <SystemFilters.Icon>
            <SlidersHorizontal className="w-4 h-4" />
          </SystemFilters.Icon>
          <div className="min-w-0 flex-1">
            <SystemFilters.Title>Filtros de Busca</SystemFilters.Title>
            <SystemFilters.Description>
              Refine a visualização por ordenação, conexão, condição e status
              da UP
            </SystemFilters.Description>
          </div>
        </div>
        <SystemFilters.Toggle
          values={activeFilters}
          labels={filterLabels}
          valueResolver={handleValueResolver}
        />
      </SystemFilters.Header>

      <SystemFilters.Body>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 w-full">
          {children}
        </div>
      </SystemFilters.Body>
    </SystemFilters.Root>
  )
}
