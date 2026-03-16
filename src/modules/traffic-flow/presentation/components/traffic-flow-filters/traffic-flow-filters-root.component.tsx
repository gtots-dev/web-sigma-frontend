'use client'

import { TrafficFlowForm } from '../traffic-flow-form'
import type { TrafficFlowFiltersInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-filters.interface'

interface Props {
  initialSettings: TrafficFlowFiltersInterface
  onSubmit: (filters: TrafficFlowFiltersInterface) => void
}

export function TrafficFlowFiltersRoot({ initialSettings, onSubmit }: Props) {
  return (
    <div className="flex flex-col gap-y-2 border rounded-md p-5">
      <TrafficFlowForm.Form initSettings={initialSettings}>
        <div className="flex items-end gap-5">
          <TrafficFlowForm.Inputs.Points />
          <TrafficFlowForm.Inputs.Lanes />
          <TrafficFlowForm.Inputs.groups />
          <TrafficFlowForm.Inputs.Date />
          <TrafficFlowForm.Inputs.Time />
          <TrafficFlowForm.Inputs.Granularity />

          <TrafficFlowForm.Submit onSubmit={onSubmit} />
        </div>
      </TrafficFlowForm.Form>
    </div>
  )
}
