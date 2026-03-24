'use client'

import * as React from 'react'
import type { SeriesConfig } from '../components/traffic-flow-absolute-chart'
import type { TrafficFlowGranularityInterface } from '../../domain/interfaces/traffic-flow-granularity.interface'
import type { ChartDatum } from '../hooks/use-traffic-chart-adapter'

export type TrafficFlowAbsoluteChartContextValue = {
  data: ChartDatum[]
  series: SeriesConfig<string>[]
  granularity: TrafficFlowGranularityInterface
  selectedSeries: string[]
  setSelectedSeries: (keys: string[]) => void
}

export const TrafficFlowAbsoluteChartContext =
  React.createContext<TrafficFlowAbsoluteChartContextValue | null>(null)

export function useTrafficFlowAbsoluteChartContext() {
  const ctx = React.useContext(TrafficFlowAbsoluteChartContext)
  if (!ctx) {
    throw new Error('Chart components must be used inside <Chart.Root>')
  }
  return ctx as TrafficFlowAbsoluteChartContextValue
}
