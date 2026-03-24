'use client'

import { ReferenceArea } from 'recharts'
import { useChartBarContext } from '../../contexts/chart-bar.context'

export function ChartBarZoomArea() {
  const { refAreaLeft, refAreaRight } = useChartBarContext()

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
