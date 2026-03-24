'use client'

import { BarChart } from 'recharts'
import { ChartContainer } from '@/modules/shared/presentation/components/shadcn/chart'
import { useChartBarContext } from '../../contexts/chart-bar.context'

export function ChartBarChart({
  children,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleWheelZoom
}: any) {
  const { zoomedData, chartConfig, locked } = useChartBarContext()

  return (
    <ChartContainer
      config={chartConfig}
      className="h-full w-full"
      onWheelCapture={locked ? handleWheelZoom : undefined}
    >
      <BarChart accessibilityLayer data={zoomedData} margin={{ bottom: 45 }}>
        {children}
      </BarChart>
    </ChartContainer>
  )
}
