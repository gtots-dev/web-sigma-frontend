'use client'

import { useMemo } from 'react'
import type { ChartDatum } from './use-traffic-chart-adapter'

type Params = {
  zoomedData: ChartDatum[]
  chartWidth: number
}

export function useChartXAxisTicks({
  zoomedData,
  chartWidth
}: Params): number[] {
  return useMemo(() => {
    if (!zoomedData.length || chartWidth <= 0) return []
    const PIXELS_PER_TICK = 80
    const ticks: number[] = []
    const maxTicks = Math.max(1, Math.floor(chartWidth / PIXELS_PER_TICK))
    const step = Math.max(1, Math.ceil(zoomedData.length / maxTicks))

    for (let i = 0; i < zoomedData.length; i += step) {
      ticks.push(zoomedData[i].date)
    }

    const last = zoomedData[zoomedData.length - 1]?.date
    if (last != null && ticks[ticks.length - 1] !== last) ticks.push(last)

    return ticks
  }, [zoomedData, chartWidth])
}
