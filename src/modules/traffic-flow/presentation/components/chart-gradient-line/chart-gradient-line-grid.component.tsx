import { CartesianGrid } from 'recharts'

export function ChartGradientLineGrid() {
  return (
    <CartesianGrid
      strokeDasharray="3 3"
      stroke="hsl(var(--border))"
      vertical={false}
    />
  )
}
