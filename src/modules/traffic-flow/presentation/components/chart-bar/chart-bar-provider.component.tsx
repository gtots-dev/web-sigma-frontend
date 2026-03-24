import { ChartBarContext } from '../../contexts/chart-bar.context'
import { useChartScrollLock } from '../../hooks/use-chart-scroll-lock.hook'
import { useChartXAxisTicks } from '../../hooks/use-chart-xaxis-ticks.hook'

export function ChartBarProvider(props: any) {
  const xAxisTicks = useChartXAxisTicks({
    zoomedData: props.zoomedData,
    chartWidth: props.chartWidth
  })

  const { locked, chartWrapperRef, focusAndLock, unlock } = useChartScrollLock()

  return (
    <ChartBarContext.Provider
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
    </ChartBarContext.Provider>
  )
}
