import type { ReactNode } from 'react'
import { ChartGradientLineContext } from '../../contexts/chart-gradient-line.context'
import { useChartScrollLock } from '../../hooks/use-chart-scroll-lock.hook'
import { useChartXAxisTicks } from '../../hooks/use-chart-xaxis-ticks.hook'
import type { ChartDatum } from '../../hooks/use-traffic-chart-adapter'
import type { SeriesConfig } from '../traffic-flow-absolute-chart'
import type { TrafficFlowGranularityInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-granularity.interface'
import type { ChartConfig } from '@/modules/shared/presentation/components/shadcn/chart'

type ChartGradientLineProviderProps = {
  children?: ReactNode
  zoomedData: ChartDatum[]
  visibleSeries: SeriesConfig[]
  orderedVisibleSeries: SeriesConfig[]
  chartConfig: ChartConfig
  granularity: TrafficFlowGranularityInterface
  chartWidth: number
  refAreaLeft: number | null
  refAreaRight: number | null
  startDate: number | null
}

export function ChartGradientLineProvider(
  props: ChartGradientLineProviderProps
) {
  const xAxisTicks = useChartXAxisTicks({
    zoomedData: props.zoomedData,
    chartWidth: props.chartWidth
  })

  const { locked, chartWrapperRef, focusAndLock, unlock } = useChartScrollLock()

  return (
    <ChartGradientLineContext.Provider
      value={{
        ...props,
        xAxisTicks,
        locked,
        focusAndLock,
        unlock,
        chartWrapperRef
      }}
    >
      {props.children}
    </ChartGradientLineContext.Provider>
  )
}
