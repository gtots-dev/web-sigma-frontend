'use client'

import type { ReactNode } from 'react'
import type { TrafficFlowGranularityInterface } from '@/modules/traffic-flow/domain/interfaces/traffic-flow-granularity.interface'
import { TrafficFlowChart, type SeriesConfig } from '../traffic-flow-chart'
import type { ChartDatum } from '../../hooks/use-traffic-chart-adapter'
import { ChartProvider } from '../../contexts/chart.context'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Download, RefreshCcw } from 'lucide-react'
import { SeriesMultiSelectInline } from './traffic-flow-chart-multiple-select-inline.component'
import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'

type Props = {
  data: ChartDatum[]
  series: SeriesConfig<string>[]
  granularity: TrafficFlowGranularityInterface
  selectedSeries: string[]
  onSeriesChange: (keys: string[]) => void
  isLoading?: boolean
  onRefresh: () => void
  onExport: () => void
  children?: ReactNode
}

export function TrafficFlowChartRoot({
  data,
  series,
  granularity,
  selectedSeries,
  onSeriesChange,
  isLoading,
  onRefresh,
  onExport
}: Props) {
  const teste = series.map((serie, index) => {
    return {
      id: serie.key,
      label: serie.label,
      value: serie.label
    }
  })

  return (
    <ChartProvider
      data={data}
      series={series}
      granularity={granularity}
      selectedSeries={selectedSeries}
      onSeriesChange={onSeriesChange}
    >
      <TrafficFlowChart.Loading loading={isLoading}>
        <TrafficFlowChart.Header
          title="Passagens de Veículos (Classes)"
          description="Passagens por classe de tamanho – Valor absoluto"
        >
          <Button size="icon" variant="outline" onClick={onExport}>
            <Download />
          </Button>
        </TrafficFlowChart.Header>

        <TrafficFlowChart.Content
          refresh={
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              onClick={onRefresh}
            >
              <RefreshCcw />
            </Button>
          }
          legendHeader={
            <div className="flex gap-x-4 ms-auto">
              <MultiSelect
                items={teste}
                value={selectedSeries}
                className="!w-[200px]"
                onChange={onSeriesChange}
                placeholder="Selecionar modelos"
                notFoundItemPlaceholder="Nenhum modelo encontrado"
                minSelected={1}
                dotColor={(item) =>
                  series.find((serie) => serie.key === item.id)?.color
                }
              />
            </div>
          }
          legend={
            <div className="bg-white dark:bg-black border rounded-md p-3">
              <SeriesMultiSelectInline
                className="!ms-auto"
                verticalAlign="center"
                series={series}
                value={selectedSeries}
                onChange={onSeriesChange}
              />
            </div>
          }
        />
      </TrafficFlowChart.Loading>
    </ChartProvider>
  )
}
