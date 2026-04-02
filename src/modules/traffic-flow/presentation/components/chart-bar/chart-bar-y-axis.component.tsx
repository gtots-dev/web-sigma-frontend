import { YAxis } from 'recharts'

export function ChartBarYAxis() {
  return (
    <YAxis
      domain={[0, 100]}
      tickLine={false}
      axisLine={false}
      tickFormatter={(value) =>
        `${Math.round((value + Number.EPSILON) * 100) / 100}%`
      }
    />
  )
}
