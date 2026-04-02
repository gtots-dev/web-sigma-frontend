'use client'

import * as React from 'react'
import type { SeriesConfig } from '../components/traffic-flow-percentage-chart'
import type { TrafficFlowGranularityInterface } from '../../domain/interfaces/traffic-flow-granularity.interface'
import type { ChartDatum } from '../hooks/use-traffic-chart-adapter'

export type TrafficFlowPercentageChartContextValue = {
  data: ChartDatum[]
  series: SeriesConfig<string>[]
  granularity: TrafficFlowGranularityInterface
  selectedSeries: string[]
  isFetched: boolean
  setSelectedSeries: (keys: string[]) => void
}

export const TrafficFlowPercentageChartContext =
  React.createContext<TrafficFlowPercentageChartContextValue | null>(null)

export function useTrafficFlowPercentageChartContext() {
  const ctx = React.useContext(TrafficFlowPercentageChartContext)
  if (!ctx) {
    throw new Error('Chart components must be used inside <Chart.Root>')
  }
  return ctx as TrafficFlowPercentageChartContextValue
}
