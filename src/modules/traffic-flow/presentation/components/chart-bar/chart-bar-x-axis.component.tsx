'use client'

import { XAxis } from 'recharts'
import { useChartBarContext } from '../../contexts/chart-bar.context'
import { ChartXAxisTick } from './chart-bar-x-axis-tick.component'

export function ChartBarXAxis() {
  const { granularity } = useChartBarContext()

  return (
    <XAxis
      dataKey="date"
      height={50}
      tickMargin={55}
      tickLine={false}
      axisLine={false}
      // tickFormatter={(value) => value.slice(0, 3)}
      tick={(props) => <ChartXAxisTick {...props} granularity={granularity} />}
    />
  )
}
