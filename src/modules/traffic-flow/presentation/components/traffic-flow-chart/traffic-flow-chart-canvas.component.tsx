'use client'

import { AreaChart, CartesianGrid, XAxis, ReferenceArea, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/modules/shared/presentation/components/shadcn/chart'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { TrafficFlowChartAreas } from './traffic-flow-chart-areas.component'
import { TrafficFlowChartGradients } from './traffic-flow-chart-gradients.component'
import { useChartXAxisTicks } from '../../hooks/use-chart-xaxis-ticks.hook'
import { useChartScrollLock } from '../../hooks/use-chart-scroll-lock.hook'
import { Lock, LockOpen, SearchX } from 'lucide-react'
import type { ReactNode } from 'react'
import type { ChartDatum } from '../../hooks/use-traffic-chart-adapter'
import type { SeriesConfig } from '.'
import type { CategoricalChartFunc } from 'recharts/types/chart/types'
import type { TrafficFlowGranularityInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-granularity.interface'
import { ChartXAxisTick } from './traffic-flow-chart-x-axis-tick.component'

export type ChartCanvasProps = {
  zoomedData: ChartDatum[]
  visibleSeries: SeriesConfig[]
  orderedVisibleSeries: SeriesConfig[]
  chartConfig: Record<string, unknown>
  chartWidth: number
  granularity: TrafficFlowGranularityInterface
  refAreaLeft: number | null
  refAreaRight: number | null
  startDate: number | null
  legend?: ReactNode
  legendHeader?: ReactNode
  refresh?: ReactNode
  handleWheelZoom: (event: React.WheelEvent<HTMLDivElement>) => void
  handleMouseDown: CategoricalChartFunc
  handleMouseMove: CategoricalChartFunc
  handleMouseUp: CategoricalChartFunc
  resetZoom: () => void
}

export function TrafficFlowChartCanvas({
  zoomedData,
  visibleSeries,
  orderedVisibleSeries,
  chartConfig,
  chartWidth,
  granularity,
  refAreaLeft,
  refAreaRight,
  startDate,
  legend,
  legendHeader,
  refresh,
  handleWheelZoom,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  resetZoom
}: ChartCanvasProps) {
  const xAxisTicks = useChartXAxisTicks({
    zoomedData,
    chartWidth
  })

  const { locked, chartWrapperRef, focusAndLock, unlock } = useChartScrollLock()

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 w-full">
          <Button
            size="icon"
            className="!w-8 !h-8"
            variant="outline"
            onClick={resetZoom}
            disabled={!startDate}
          >
            <SearchX />
          </Button>

          <Button
            size="icon"
            type="button"
            className="!w-8 !h-8"
            variant={locked ? 'primary' : 'outline'}
            onClick={() => (!locked ? focusAndLock() : unlock())}
          >
            {locked ? <Lock /> : <LockOpen />}
          </Button>

          {refresh && refresh}
          {legendHeader && legendHeader}
        </div>
      </div>

      <div
        ref={chartWrapperRef}
        className="flex flex-col h-full w-full overflow-x-auto overflow-y-hidden"
      >
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
            <TrafficFlowChartGradients series={visibleSeries} />

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />

            <YAxis
              width={50}
              domain={['auto', 'auto']}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              tickFormatter={(value: number) =>
                new Intl.NumberFormat('pt-BR').format(value)
              }
            />

            <XAxis
              dataKey="date"
              type="number"
              scale="time"
              domain={['dataMin', 'dataMax']}
              ticks={xAxisTicks}
              tickMargin={55}
              height={80}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tick={(props) => (
                <ChartXAxisTick {...props} granularity={granularity} />
              )}
            />

            <ChartTooltip
              cursor={false}
              content={(props) => (
                <ChartTooltipContent {...props} indicator="dot" />
              )}
            />

            <TrafficFlowChartAreas series={orderedVisibleSeries} />

            {refAreaLeft && refAreaRight && (
              <ReferenceArea
                x1={refAreaLeft}
                x2={refAreaRight}
                strokeOpacity={0.3}
                fill="hsl(var(--foreground))"
                fillOpacity={0.05}
              />
            )}
          </AreaChart>
        </ChartContainer>
      </div>

      <div className="w-full">{legend}</div>
    </>
  )
}
