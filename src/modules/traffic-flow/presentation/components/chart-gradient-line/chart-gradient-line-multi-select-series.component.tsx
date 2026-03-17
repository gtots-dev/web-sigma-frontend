import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'
import { useTrafficFlowChartContext } from '../../contexts/traffic-flow-chart.context'

export function ChartGradientLineMultiSelectSeries() {
  const { series, selectedSeries, setSelectedSeries } =
    useTrafficFlowChartContext()

  return (
    <div className="flex gap-x-4 ms-auto">
      <MultiSelect
        items={series.map((serie) => {
          return {
            id: serie.key,
            label: serie.label,
            value: serie.label
          }
        })}
        value={selectedSeries}
        className="!w-[200px]"
        onChange={setSelectedSeries}
        placeholder="Selecionar modelos"
        notFoundItemPlaceholder="Nenhum modelo encontrado"
        minSelected={1}
        dotColor={(item) =>
          series.find((serie) => serie.key === item.id)?.color
        }
      />
    </div>
  )
}
