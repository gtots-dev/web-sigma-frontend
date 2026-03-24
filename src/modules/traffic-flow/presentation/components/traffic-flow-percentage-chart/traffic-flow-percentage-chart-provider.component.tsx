import type { TrafficFlowGranularityInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-granularity.interface'
import type { SeriesConfig } from '.'
import { TrafficFlowPercentageChartContext } from '../../contexts/traffic-flow-percentage-chart.context'
import type { ChartDatum } from '../../hooks/use-traffic-chart-adapter'

type TrafficFlowPercentageChartProviderProps<TSeriesKey extends string> =
  React.PropsWithChildren<{
    data: ChartDatum[]
    series: SeriesConfig<TSeriesKey>[]
    granularity: TrafficFlowGranularityInterface
    selectedSeries: TSeriesKey[]
    onSeriesChange: (keys: TSeriesKey[]) => void
    isFetched: boolean
  }>

export function TrafficFlowPercentageChartProvider<TSeriesKey extends string>({
  data,
  series,
  granularity,
  selectedSeries,
  onSeriesChange,
  isFetched,
  children
}: TrafficFlowPercentageChartProviderProps<TSeriesKey>) {
  return (
    <TrafficFlowPercentageChartContext.Provider
      value={{
        data,
        series,
        granularity,
        selectedSeries,
        isFetched,
        setSelectedSeries: onSeriesChange
      }}
    >
      {children}
    </TrafficFlowPercentageChartContext.Provider>
  )
}
