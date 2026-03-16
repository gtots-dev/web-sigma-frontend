'use client'

import { useMemo, type ReactNode } from 'react'
import { CardContent } from '@/modules/shared/presentation/components/shadcn/card'
import { useChartContext } from '../../contexts/chart.context'
import { useChartSeries } from '../../hooks/use-chart-series.hook'
import { useChartZoom } from '../../hooks/use-zoom-chart.hook'
import { useChartDimensions } from '../../hooks/use-chart-dimensions.hook'
import type { ChartDatum } from '../../hooks/use-traffic-chart-adapter'
import { TrafficFlowChartEmptyData } from './traffic-flow-chart-empty-data.component'
import { TrafficFlowChartEmptySeries } from './traffic-flow-chart-empty-series.component'
import { TrafficFlowChartCanvas } from './traffic-flow-chart-canvas.component'

type Props = {
  legend?: ReactNode
  legendHeader?: ReactNode
  refresh?: ReactNode
}

export function  TrafficFlowChartContent({ legend, legendHeader, refresh }: Props) {
  const { data, series, granularity, selectedSeries } = useChartContext<
    ChartDatum,
    string
  >()

  const { visibleSeries, chartConfig } = useChartSeries(series, selectedSeries)

  const {
    zoomedData,
    startDate,
    refAreaLeft,
    refAreaRight,
    handleWheelZoom,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetZoom
  } = useChartZoom(data)

  const { chartWidth } = useChartDimensions(zoomedData.length)

  const orderedVisibleSeries = useMemo(() => {
    return [...visibleSeries].sort((a, b) => {
      const sum = (key: string) =>
        zoomedData.reduce((acc, item) => acc + ((item as any)[key] ?? 0), 0)

      return sum(a.key) - sum(b.key)
    })
  }, [visibleSeries, zoomedData])

  const hasData = zoomedData && zoomedData.length > 0
  const hasVisibleSeries = visibleSeries.length > 0

  if (!hasData) return <TrafficFlowChartEmptyData />
  if (!hasVisibleSeries) return <TrafficFlowChartEmptySeries legend={legend} />

  return (
    <CardContent className="flex flex-col h-[800px] gap-y-5 p-6">
      <TrafficFlowChartCanvas
        zoomedData={zoomedData}
        visibleSeries={visibleSeries}
        orderedVisibleSeries={orderedVisibleSeries}
        chartConfig={chartConfig}
        chartWidth={chartWidth}
        granularity={granularity}
        refAreaLeft={refAreaLeft}
        refAreaRight={refAreaRight}
        startDate={startDate}
        legend={legend}
        legendHeader={legendHeader}
        refresh={refresh}
        handleWheelZoom={handleWheelZoom}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        resetZoom={resetZoom}
      />
    </CardContent>
  )
}
