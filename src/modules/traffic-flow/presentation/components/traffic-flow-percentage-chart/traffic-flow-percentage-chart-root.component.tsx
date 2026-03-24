'use client'

import { useMemo, type ReactNode } from 'react'
import { TrafficFlowPercentageChart } from '.'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Download } from 'lucide-react'
import { CardContent } from '@/modules/shared/presentation/components/shadcn/card'
import { useChartSeries } from '../../hooks/use-chart-series.hook'
import { useChartZoom } from '../../hooks/use-zoom-chart.hook'
import { useChartDimensions } from '../../hooks/use-chart-dimensions.hook'
import { TrafficFlowPercentageChartEmptyData } from './traffic-flow-percentage-chart-empty-data.component'
import { TrafficFlowPercentageChartEmptySeries } from './traffic-flow-percentage-chart-empty-series.component'
import { useTrafficFlowPercentageChartContext } from '../../contexts/traffic-flow-percentage-chart.context'
import { ChartBar } from '../chart-bar'

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

export function TrafficFlowPercentageChartRoot<
  T extends BaseChartItem = BaseChartItem
>({ isLoading, onRefresh, onExport }: Props) {
  const { data, granularity, selectedSeries, series, isFetched } =
    useTrafficFlowPercentageChartContext()

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
      const sum = (key: keyof (typeof zoomedData)[number]) =>
        zoomedData.reduce((acc, item) => {
          const value = item[key]
          return acc + (typeof value === 'number' ? value : 0)
        }, 0)

      return (
        sum(a.key as keyof (typeof zoomedData)[number]) -
        sum(b.key as keyof (typeof zoomedData)[number])
      )
    })
  }, [visibleSeries, zoomedData])

  const hasData = zoomedData.length > 0
  const hasVisibleSeries = visibleSeries.length > 0
  const isEmptyState = !isLoading && !hasData
  const isEmptySeriesState = !isLoading && hasData && !hasVisibleSeries

  if (!isFetched || isLoading) {
    return <TrafficFlowPercentageChart.Loading loading />
  }

  if (isEmptyState) {
    return <TrafficFlowPercentageChartEmptyData />
  }

  if (isEmptySeriesState) {
    return (
      <TrafficFlowPercentageChartEmptySeries>
        <ChartBar.Legend>
          <ChartBar.MultiSelectSeriesInline />
        </ChartBar.Legend>
      </TrafficFlowPercentageChartEmptySeries>
    )
  }

  return (
    <div className="relative min-h-[450px] border rounded-lg">
      <TrafficFlowPercentageChart.Header
        title="Passagens de Veículos (Classes)"
        description="Passagens por classe de tamanho – Distribuição percentual"
      >
        <Button size="icon" variant="outline" onClick={onExport}>
          <Download />
        </Button>
      </TrafficFlowPercentageChart.Header>

      <CardContent className="flex flex-col h-[800px] gap-y-5 p-6">
        <ChartBar.Provider
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
          <ChartBar.Toolbar>
            <ChartBar.ResetZoom onClick={resetZoom} disabled={!startDate} />
            <ChartBar.LockScroll />
            <ChartBar.Refresh onClick={onRefresh} />
            <ChartBar.MultiSelectSeries />
          </ChartBar.Toolbar>

          <ChartBar.ScrollArea>
            <ChartBar.Chart
              handleMouseDown={handleMouseDown}
              handleMouseMove={handleMouseMove}
              handleMouseUp={handleMouseUp}
              handleWheelZoom={handleWheelZoom}
            >
              <ChartBar.Grid />
              <ChartBar.YAxis />
              <ChartBar.XAxis />
              <ChartBar.Areas />
              <ChartBar.ZoomArea />
              <ChartBar.Tooltip />
            </ChartBar.Chart>
          </ChartBar.ScrollArea>

          {series && (
            <ChartBar.Legend>
              <ChartBar.MultiSelectSeriesInline />
            </ChartBar.Legend>
          )}
        </ChartBar.Provider>
      </CardContent>
    </div>
  )
}
