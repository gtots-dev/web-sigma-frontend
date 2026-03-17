'use client'

import * as React from 'react'
import type { SeriesConfig } from '../components/traffic-flow-chart'
import type { TrafficFlowGranularityInterface } from '../../domain/interfaces/traffic-flow-granularity.interface'
import type { ChartDatum } from '../hooks/use-traffic-chart-adapter'

export type TrafficFlowChartContextValue = {
  data: ChartDatum[]
  series: SeriesConfig<string>[]
  granularity: TrafficFlowGranularityInterface
  selectedSeries: string[]
  setSelectedSeries: (keys: string[]) => void
}

export const TrafficFlowChartContext =
  React.createContext<TrafficFlowChartContextValue | null>(null)

export function useTrafficFlowChartContext() {
  const ctx = React.useContext(TrafficFlowChartContext)
  if (!ctx) {
    throw new Error('Chart components must be used inside <Chart.Root>')
  }
  return ctx as TrafficFlowChartContextValue
}
