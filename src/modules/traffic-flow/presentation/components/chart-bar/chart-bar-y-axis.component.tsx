import { YAxis } from 'recharts'

export function ChartBarYAxis() {
  return (
    <YAxis
      domain={[0, 100]}
      tickLine={false}
      axisLine={false}
      tickFormatter={(value) => `${value}%`}
    />
  )
}
