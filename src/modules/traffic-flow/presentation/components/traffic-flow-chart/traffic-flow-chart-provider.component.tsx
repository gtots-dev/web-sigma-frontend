import type { TrafficFlowGranularityInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-granularity.interface'
import type { SeriesConfig } from '.'
import { TrafficFlowChartContext } from '../../contexts/traffic-flow-chart.context'
import type { ChartDatum } from '../../hooks/use-traffic-chart-adapter'

type TrafficFlowChartProviderProps<TSeriesKey extends string> =
  React.PropsWithChildren<{
    data: ChartDatum[]
    series: SeriesConfig<TSeriesKey>[]
    granularity: TrafficFlowGranularityInterface
    selectedSeries: TSeriesKey[]
    onSeriesChange: (keys: TSeriesKey[]) => void
  }>

export function TrafficFlowChartProvider<TSeriesKey extends string>({
  data,
  series,
  granularity,
  selectedSeries,
  onSeriesChange,
  children
}: TrafficFlowChartProviderProps<TSeriesKey>) {
  return (
    <TrafficFlowChartContext.Provider
      value={{
        data,
        series,
        granularity,
        selectedSeries,
        setSelectedSeries: onSeriesChange
      }}
    >
      {children}
    </TrafficFlowChartContext.Provider>
  )
}
