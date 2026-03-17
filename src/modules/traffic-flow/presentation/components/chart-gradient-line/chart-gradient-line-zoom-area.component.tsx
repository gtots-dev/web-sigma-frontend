'use client'

import { ReferenceArea } from 'recharts'
import { useChartGradientLineContext } from '../../contexts/chart-gradient-line.context'

export function ChartGradientLineZoomArea() {
  const { refAreaLeft, refAreaRight } = useChartGradientLineContext()

  if (!refAreaLeft || !refAreaRight) return null

  return (
    <ReferenceArea
      x1={refAreaLeft}
      x2={refAreaRight}
      strokeOpacity={0.3}
      fill="hsl(var(--foreground))"
      fillOpacity={0.05}
    />
  )
}
