import { TrafficFlowChartLoading } from './traffic-flow-chart-loading.component'
import { TrafficFlowChartContent } from './traffic-flow-chart-content.component'
import { TrafficFlowChartHeader } from './traffic-flow-chart-header.component'
import { TrafficFlowChartSkeleton } from './traffic-flow-chart-skeleton.component'
import { TrafficFlowChartRoot } from './traffic-flow-chart-root.component'

export type SeriesKey = string

export type SeriesConfig<TKey extends SeriesKey = SeriesKey> = {
  key: TKey
  label: string
  color: string
  stacked?: boolean
}

export const TrafficFlowChart = {
  Root: TrafficFlowChartRoot,
  Header: TrafficFlowChartHeader,
  Content: TrafficFlowChartContent,
  Skeleton: TrafficFlowChartSkeleton,
  Loading: TrafficFlowChartLoading
}
