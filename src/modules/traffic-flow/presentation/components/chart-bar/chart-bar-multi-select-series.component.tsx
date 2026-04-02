import { MultiSelect } from '@/modules/shared/presentation/components/multi-select/multi-select.component'
import { useTrafficFlowPercentageChartContext } from '../../contexts/traffic-flow-percentage-chart.context'

export function ChartBarMultiSelectSeries() {
  const { series, selectedSeries, setSelectedSeries } =
    useTrafficFlowPercentageChartContext()

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
        className="!w-full md:!w-[200px] !m-0 md:ms-auto"
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
