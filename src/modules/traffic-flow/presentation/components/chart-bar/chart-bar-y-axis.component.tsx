import { YAxis } from 'recharts'
import { formatChartNumber } from '@/modules/shared/presentation/lib/utils'

export function ChartBarYAxis() {
  return (
    <YAxis
      domain={[0, 110]}
      tickLine={false}
      axisLine={false}
      width={80}
      tickFormatter={(value) =>
        formatChartNumber(value, { percentage: true, decimals: 4 })
      }
    />
  )
}
