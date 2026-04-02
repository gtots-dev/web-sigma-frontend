import { TrafficFlowAbsoluteChartLoading } from './traffic-flow-absolute-chart-loading.component'
import { TrafficFlowAbsoluteChartHeader } from './traffic-flow-absolute-chart-header.component'
import { TrafficFlowAbsoluteChartSkeleton } from './traffic-flow-absolute-chart-skeleton.component'
import { TrafficFlowAbsoluteChartRoot } from './traffic-flow-absolute-chart-root.component'
import { TrafficFlowAbsoluteChartProvider } from './traffic-flow-absolute-chart-provider.component'

export type SeriesKey = string

export type SeriesConfig<TKey extends SeriesKey = SeriesKey> = {
  key: TKey
  label: string
  color: string
  stacked?: boolean
}

export const TrafficFlowAbsoluteChart = {
  Root: TrafficFlowAbsoluteChartRoot,
  Header: TrafficFlowAbsoluteChartHeader,
  Skeleton: TrafficFlowAbsoluteChartSkeleton,
  Loading: TrafficFlowAbsoluteChartLoading,
  Provider: TrafficFlowAbsoluteChartProvider
}
