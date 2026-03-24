import { TrafficFlowPercentageChartLoading } from './traffic-flow-percentage-chart-loading.component'
import { TrafficFlowPercentageChartHeader } from './traffic-flow-percentage-chart-header.component'
import { TrafficFlowPercentageChartSkeleton } from './traffic-flow-percentage-chart-skeleton.component'
import { TrafficFlowPercentageChartRoot } from './traffic-flow-percentage-chart-root.component'
import { TrafficFlowPercentageChartProvider } from './traffic-flow-percentage-chart-provider.component'

export type SeriesKey = string

export type SeriesConfig<TKey extends SeriesKey = SeriesKey> = {
  key: TKey
  label: string
  color: string
  stacked?: boolean
}

export const TrafficFlowPercentageChart = {
  Root: TrafficFlowPercentageChartRoot,
  Header: TrafficFlowPercentageChartHeader,
  Skeleton: TrafficFlowPercentageChartSkeleton,
  Loading: TrafficFlowPercentageChartLoading,
  Provider: TrafficFlowPercentageChartProvider
}
