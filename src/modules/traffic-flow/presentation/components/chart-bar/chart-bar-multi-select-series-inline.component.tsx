import { useTrafficFlowPercentageChartContext } from '../../contexts/traffic-flow-percentage-chart.context'
import { SeriesMultiSelectInline } from '../traffic-flow-percentage-chart/traffic-flow-percentage-chart-multiple-select-inline.component'

export function ChartBarMultiSelectSeriesInline() {
  const { series, selectedSeries, setSelectedSeries } =
    useTrafficFlowPercentageChartContext()

  return (
    <div className="bg-white dark:bg-black border rounded-md p-3">
      <SeriesMultiSelectInline
        className="!ms-auto flex-col md:flex-row p-3 md:p-0"
        verticalAlign="center"
        series={series}
        value={selectedSeries}
        onChange={setSelectedSeries}
      />
    </div>
  )
}
