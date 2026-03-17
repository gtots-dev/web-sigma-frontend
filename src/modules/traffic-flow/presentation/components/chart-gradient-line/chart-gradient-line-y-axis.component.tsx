import { YAxis } from 'recharts'

export function ChartGradientLineYAxis() {
  return (
    <YAxis
      width={50}
      domain={['auto', 'auto']}
      tickLine={false}
      axisLine={{ stroke: 'hsl(var(--border))' }}
      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
    />
  )
}
