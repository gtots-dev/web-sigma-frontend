import { useMemo } from 'react'
import type { ChartDatum } from './use-traffic-chart-adapter'

type Params = {
  zoomedData: ChartDatum[]
  chartWidth: number
}

export function useChartXAxisTicks({ zoomedData, chartWidth }: Params) {
  const xAxisTicks = useMemo(() => {
    if (!zoomedData.length) return []
    const maxTicks = Math.floor(chartWidth / 80)
    const step = Math.max(
      1,
      Math.ceil(zoomedData.length / Math.max(maxTicks, 1))
    )

    return zoomedData
      .filter((_, index) => index % step === 0)
      .map((d) => d.date)
  }, [zoomedData, chartWidth])

  return xAxisTicks
}
