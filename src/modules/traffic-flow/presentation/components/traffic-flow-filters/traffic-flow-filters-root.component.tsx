'use client'

import { SlidersHorizontal } from 'lucide-react'
import { SystemFilters } from '@/modules/shared/presentation/components/system-filters'
import { TrafficFlowForm } from '../traffic-flow-form'
import type { TrafficFlowFiltersInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-filters.interface'
import { useTrafficFlowFilterResolver } from '../../hooks/use-traffic-flow-filter-resolver.hook'

interface Props {
  initialSettings: TrafficFlowFiltersInterface
  onSubmit: (filters: TrafficFlowFiltersInterface) => void
}

export function TrafficFlowFiltersRoot({ initialSettings, onSubmit }: Props) {
  const { filterLabels, handleValueResolver } = useTrafficFlowFilterResolver()

  return (
    <SystemFilters.Root>
      <TrafficFlowForm.Form initSettings={initialSettings}>
        <SystemFilters.Header>
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <SystemFilters.Icon>
              <SlidersHorizontal className="w-4 h-4" />
            </SystemFilters.Icon>
            <div className="min-w-0 flex-1">
              <SystemFilters.Title>Filtros de Busca</SystemFilters.Title>
              <SystemFilters.Description>
                Refine a visualização por pontos, faixas, grupos, data/hora e
                granularidade
              </SystemFilters.Description>
            </div>
          </div>
          <SystemFilters.Toggle
            labels={filterLabels}
            valueResolver={handleValueResolver}
          />
        </SystemFilters.Header>

        <SystemFilters.Body>
          <div className="flex flex-col gap-3 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2.5">
              <TrafficFlowForm.Inputs.Points />
              <TrafficFlowForm.Inputs.Lanes />
              <TrafficFlowForm.Inputs.groups />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                <TrafficFlowForm.Inputs.Granularity />
              </div>
              <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                <TrafficFlowForm.Inputs.Date />
              </div>
              <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                <TrafficFlowForm.Inputs.Time />
              </div>
              <div className="col-span-2 sm:col-span-1 lg:col-span-1 flex items-center">
                <TrafficFlowForm.Submit onSubmit={onSubmit} />
              </div>
            </div>
          </div>
        </SystemFilters.Body>
      </TrafficFlowForm.Form>
    </SystemFilters.Root>
  )
}
