'use client'

import { AreaChart } from 'recharts'
import { ChartContainer } from '@/modules/shared/presentation/components/shadcn/chart'
import { useChartGradientLineContext } from '../../contexts/chart-gradient-line.context'

export function ChartGradientLineChart({
  children,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleWheelZoom
}: any) {
  const { zoomedData, chartWidth, chartConfig, locked } =
    useChartGradientLineContext()

  return (
    <ChartContainer
      config={chartConfig}
      className="h-full w-full"
      onWheelCapture={locked ? handleWheelZoom : undefined}
    >
      <AreaChart
        height={220}
        width={chartWidth}
        data={zoomedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 45 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {children}
      </AreaChart>
    </ChartContainer>
  )
}
