import { ChartGradientLineContext } from '../../contexts/chart-gradient-line.context'
import { useChartScrollLock } from '../../hooks/use-chart-scroll-lock.hook'
import { useChartXAxisTicks } from '../../hooks/use-chart-xaxis-ticks.hook'

export function ChartGradientLineProvider(props: any) {
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
