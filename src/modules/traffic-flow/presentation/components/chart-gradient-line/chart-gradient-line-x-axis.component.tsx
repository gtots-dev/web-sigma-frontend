'use client'

import { XAxis } from 'recharts'
import { ChartXAxisTick } from './chart-gradient-line-x-axis-tick.component'
import { useChartGradientLineContext } from '../../contexts/chart-gradient-line.context'

export function ChartGradientLineXAxis() {
  const { xAxisTicks, granularity } = useChartGradientLineContext()

  return (
    <XAxis
      dataKey="date"
      type="number"
      scale="time"
      domain={['dataMin', 'dataMax']}
      ticks={xAxisTicks}
      tickMargin={55}
      height={80}
      tickLine={false}
      axisLine={{ stroke: 'hsl(var(--border))' }}
      tick={(props) => (
        <ChartXAxisTick {...props} granularity={granularity} />
      )}
    />
  )
}