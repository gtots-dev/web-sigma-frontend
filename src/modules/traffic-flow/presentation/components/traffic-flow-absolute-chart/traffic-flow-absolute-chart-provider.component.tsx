import type { TrafficFlowGranularityInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-granularity.interface'
import type { SeriesConfig } from '.'
import { TrafficFlowAbsoluteChartContext } from '../../contexts/traffic-flow-absolute-chart.context'
import type { ChartDatum } from '../../hooks/use-traffic-chart-adapter'

type TrafficFlowAbsoluteChartProviderProps<TSeriesKey extends string> =
  React.PropsWithChildren<{
    data: ChartDatum[]
    series: SeriesConfig<TSeriesKey>[]
    granularity: TrafficFlowGranularityInterface
    selectedSeries: TSeriesKey[]
    isFetched: boolean
    onSeriesChange: (keys: TSeriesKey[]) => void
  }>

export function TrafficFlowAbsoluteChartProvider<TSeriesKey extends string>({
  data,
  series,
  granularity,
  isFetched,
  selectedSeries,
  onSeriesChange,
  children
}: TrafficFlowAbsoluteChartProviderProps<TSeriesKey>) {
  return (
    <TrafficFlowAbsoluteChartContext.Provider
      value={{
        data,
        series,
        isFetched,
        granularity,
        selectedSeries,
        setSelectedSeries: onSeriesChange
      }}
    >
      {children}
    </TrafficFlowAbsoluteChartContext.Provider>
  )
}
