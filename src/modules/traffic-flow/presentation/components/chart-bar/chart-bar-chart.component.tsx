'use client'

import type { ReactNode } from 'react'
import { BarChart } from 'recharts'
import { ChartContainer } from '@/modules/shared/presentation/components/shadcn/chart'
import { useChartBarContext } from '../../contexts/chart-bar.context'

type ChartMouseEvent = {
  activeLabel?: number
}

type ChartBarChartProps = {
  children?: ReactNode
  handleMouseDown?: (e: ChartMouseEvent) => void
  handleMouseMove?: (e: ChartMouseEvent) => void
  handleMouseUp?: () => void
  handleWheelZoom?: React.WheelEventHandler<HTMLDivElement>
}

export function ChartBarChart({
  children,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleWheelZoom
}: ChartBarChartProps) {
  const { zoomedData, chartConfig, locked } = useChartBarContext()

  return (
    <ChartContainer
      config={chartConfig}
      className="h-full w-full"
      onWheel={locked ? handleWheelZoom : undefined}
    >
      <BarChart
        accessibilityLayer
        data={zoomedData}
        margin={{ bottom: 45 }}
        onMouseDown={(e) => handleMouseDown?.(e as ChartMouseEvent)}
        onMouseMove={(e) => handleMouseMove?.(e as ChartMouseEvent)}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {children}
      </BarChart>
    </ChartContainer>
  )
}
