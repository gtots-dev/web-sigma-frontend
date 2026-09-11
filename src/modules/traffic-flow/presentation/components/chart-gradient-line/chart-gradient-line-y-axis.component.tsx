import { YAxis } from 'recharts'
import { formatChartNumber } from '@/modules/shared/presentation/lib/utils'

export function ChartGradientLineYAxis() {
  return (
    <YAxis
      width={80}
      domain={[0, (dataMax: number) => Math.ceil((dataMax || 10) * 1.2)]}
      tickLine={false}
      axisLine={{ stroke: 'hsl(var(--border))' }}
      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
      tickFormatter={(value) => formatChartNumber(value, { decimals: 4 })}
    />
  )
}
