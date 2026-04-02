'use client'

import { createContext, useContext } from 'react'
import type { TrafficFlowGranularityInterface } from '../../domain/interfaces/traffic-flow-granularity.interface'
import type { SeriesConfig } from '../components/traffic-flow-absolute-chart'
import type { ChartDatum } from '../hooks/use-traffic-chart-adapter'

type ChartBarContextValue = {
  zoomedData: ChartDatum[]
  visibleSeries: SeriesConfig[]
  orderedVisibleSeries: SeriesConfig[]
  chartConfig: Record<string, unknown>
  chartWidth: number
  granularity: TrafficFlowGranularityInterface
  refAreaLeft: number | null
  refAreaRight: number | null
  startDate: number | null
  xAxisTicks: number[]
  locked: boolean
  focusAndLock: VoidFunction
  unlock: VoidFunction
  chartWrapperRef: React.RefObject<HTMLDivElement>
}

export const ChartBarContext = createContext<ChartBarContextValue | null>(null)

export function useChartBarContext() {
  const ctx = useContext(ChartBarContext)
  if (!ctx) {
    throw new Error('ChartBar components must be inside ChartBar')
  }
  return ctx
}
