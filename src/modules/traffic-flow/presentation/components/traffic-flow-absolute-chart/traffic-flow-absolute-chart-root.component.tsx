'use client'

import { useMemo, type ReactNode } from 'react'
import { TrafficFlowAbsoluteChart } from '.'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Download } from 'lucide-react'
import { CardContent } from '@/modules/shared/presentation/components/shadcn/card'
import { ChartGradientLine } from '../chart-gradient-line'
import { useChartSeries } from '../../hooks/use-chart-series.hook'
import { useChartZoom } from '../../hooks/use-zoom-chart.hook'
import { useChartDimensions } from '../../hooks/use-chart-dimensions.hook'
import { TrafficFlowAbsoluteChartEmptyData } from './traffic-flow-absolute-chart-empty-data.component'
import { TrafficFlowAbsoluteChartEmptySeries } from './traffic-flow-absolute-chart-empty-series.component'
import { useTrafficFlowAbsoluteChartContext } from '../../contexts/traffic-flow-absolute-chart.context'

type BaseChartItem = {
  date: string
} & Record<string, number | string>

type SeriesConfig<T extends string> = {
  key: T
  label: string
  color: string
}

type Props = {
  isLoading?: boolean
  onRefresh: () => void
  onExport: () => void
  children?: ReactNode
}

export function TrafficFlowAbsoluteChartRoot<
  T extends BaseChartItem = BaseChartItem
>({
  isLoading = false,
  onRefresh,
  onExport
}: Props) {
  const { data, granularity, selectedSeries, series, isFetched } =
    useTrafficFlowAbsoluteChartContext()
  const typedSeries = series as SeriesConfig<keyof T & string>[]
  const { visibleSeries, chartConfig } = useChartSeries<keyof T & string>(
    typedSeries,
    selectedSeries as (keyof T & string)[]
  )

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
      const sum = (key: keyof typeof zoomedData[number]) =>
        zoomedData.reduce((acc, item) => {
          const value = item[key]
          return acc + (typeof value === 'number' ? value : 0)
        }, 0)

      return sum(a.key as keyof typeof zoomedData[number]) -
        sum(b.key as keyof typeof zoomedData[number])
    })
  }, [visibleSeries, zoomedData])

  const hasData = zoomedData.length > 0
  const hasVisibleSeries = visibleSeries.length > 0

  const isEmptyState = isFetched && !hasData
  const isEmptySeriesState = isFetched && hasData && !hasVisibleSeries

  if (!isFetched || isLoading) {
    return <TrafficFlowAbsoluteChart.Loading loading />
  }

  if (isEmptyState) {
    return <TrafficFlowAbsoluteChartEmptyData />
  }

  if (isEmptySeriesState) {
    return (
      <TrafficFlowAbsoluteChartEmptySeries>
        <ChartGradientLine.Legend>
          <ChartGradientLine.MultiSelectSeriesInline />
        </ChartGradientLine.Legend>
      </TrafficFlowAbsoluteChartEmptySeries>
    )
  }

  return (
    <div className="relative min-h-[450px] border rounded-lg">
      <TrafficFlowAbsoluteChart.Header
        title="Passagens de Veículos (Classes)"
        description="Passagens por classe de tamanho – Valor absoluto"
      >
        <Button size="icon" variant="outline" onClick={onExport}>
          <Download />
        </Button>
      </TrafficFlowAbsoluteChart.Header>

      <CardContent className="flex flex-col h-[800px] gap-y-5 p-6">
        <ChartGradientLine.Provider
          zoomedData={zoomedData}
          visibleSeries={visibleSeries}
          orderedVisibleSeries={orderedVisibleSeries}
          chartConfig={chartConfig}
          chartWidth={chartWidth}
          granularity={granularity}
          refAreaLeft={refAreaLeft}
          refAreaRight={refAreaRight}
          startDate={startDate}
        >
          <ChartGradientLine.Toolbar>
            <ChartGradientLine.ResetZoom
              onClick={resetZoom}
              disabled={!startDate}
            />
            <ChartGradientLine.LockScroll />
            <ChartGradientLine.Refresh onClick={onRefresh} />
            <ChartGradientLine.MultiSelectSeries />
          </ChartGradientLine.Toolbar>

          <ChartGradientLine.ScrollArea>
            <ChartGradientLine.Chart
              handleMouseDown={handleMouseDown}
              handleMouseMove={handleMouseMove}
              handleMouseUp={handleMouseUp}
              handleWheelZoom={handleWheelZoom}
            >
              <ChartGradientLine.Gradients />
              <ChartGradientLine.Grid />
              <ChartGradientLine.YAxis />
              <ChartGradientLine.XAxis />
              <ChartGradientLine.Areas />
              <ChartGradientLine.ZoomArea />
              <ChartGradientLine.Tooltip />
            </ChartGradientLine.Chart>
          </ChartGradientLine.ScrollArea>

          {series && (
            <ChartGradientLine.Legend>
              <ChartGradientLine.MultiSelectSeriesInline />
            </ChartGradientLine.Legend>
          )}
        </ChartGradientLine.Provider>
      </CardContent>
    </div>
  )
}