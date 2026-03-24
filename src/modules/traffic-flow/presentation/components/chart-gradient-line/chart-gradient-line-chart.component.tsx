'use client'

import { AreaChart } from 'recharts'
import { ChartContainer } from '@/modules/shared/presentation/components/shadcn/chart'
import { useChartGradientLineContext } from '../../contexts/chart-gradient-line.context'
import type { ReactNode } from 'react'

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

export function ChartGradientLineChart({
  children,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleWheelZoom
}: ChartBarChartProps) {
  const { zoomedData, chartWidth, chartConfig, locked } =
    useChartGradientLineContext()

  return (
    <ChartContainer
      config={chartConfig}
      className="h-full w-full"
      onWheel={locked ? handleWheelZoom : undefined}
    >
      <AreaChart
        height={220}
        width={chartWidth}
        data={zoomedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 45 }}
        onMouseDown={(e) => handleMouseDown?.(e as ChartMouseEvent)}
        onMouseMove={(e) => handleMouseMove?.(e as ChartMouseEvent)}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {children}
      </AreaChart>
    </ChartContainer>
  )
}
