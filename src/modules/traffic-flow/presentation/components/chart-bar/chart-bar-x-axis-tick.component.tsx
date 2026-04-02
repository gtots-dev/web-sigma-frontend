'use client'

import { formatDateByGranularity } from '../../hooks/use-filtered-chart.hook'
import { useTruncateChartText } from '../../hooks/use-truncate-chart-text.hook'
import type { TrafficFlowGranularityInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-granularity.interface'

type Props = {
  x?: string | number
  y?: string | number
  payload?: { value: number }
  granularity: TrafficFlowGranularityInterface
}

export function ChartXAxisTick({ x = 0, y = 0, payload, granularity }: Props) {
  const truncateChartText = useTruncateChartText()
  const posX = Number(x)
  const posY = Number(y)
  const label = formatDateByGranularity(payload?.value, granularity)
  const truncated = truncateChartText(label, 200)

  return (
    <g transform={`translate(${posX},${posY})`}>
      <title>{label}</title>

      <text
        transform="rotate(-45)"
        textAnchor="middle"
        fill="hsl(var(--muted-foreground))"
        fontSize={10}
      >
        {truncated}
      </text>
    </g>
  )
}
