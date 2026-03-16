'use client'

import * as React from 'react'
import type { SeriesConfig } from '../components/traffic-flow-chart'
import type { TrafficFlowGranularityInterface } from '../../domain/interfaces/traffic-flow-granularity.interface'

export type ChartContextValue<TDatum, TSeriesKey extends string> = {
  data: TDatum[]
  series: SeriesConfig<TSeriesKey>[]
  selectedSeries: TSeriesKey[]
  setSelectedSeries: (keys: TSeriesKey[]) => void
  granularity: TrafficFlowGranularityInterface
}

const ChartContext = React.createContext<ChartContextValue<any, any> | null>(
  null
)

export function useChartContext<TDatum, TSeriesKey extends string>() {
  const ctx = React.useContext(ChartContext)
  if (!ctx) {
    throw new Error('Chart components must be used inside <Chart.Root>')
  }
  return ctx as ChartContextValue<TDatum, TSeriesKey>
}

type ChartProviderProps<
  TDatum,
  TSeriesKey extends string
> = React.PropsWithChildren<{
  data: TDatum[]
  series: SeriesConfig<TSeriesKey>[]
  granularity: TrafficFlowGranularityInterface
  selectedSeries: TSeriesKey[]
  onSeriesChange: (keys: TSeriesKey[]) => void
}>

export function ChartProvider<TDatum, TSeriesKey extends string>({
  data,
  series,
  granularity,
  selectedSeries,
  onSeriesChange,
  children
}: ChartProviderProps<TDatum, TSeriesKey>) {
  return (
    <ChartContext.Provider
      value={{
        data,
        series,
        granularity,
        selectedSeries,
        setSelectedSeries: onSeriesChange
      }}
    >
      {children}
    </ChartContext.Provider>
  )
}
