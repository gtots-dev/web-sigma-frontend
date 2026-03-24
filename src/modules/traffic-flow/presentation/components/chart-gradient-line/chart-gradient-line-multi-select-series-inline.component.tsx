import { useTrafficFlowAbsoluteChartContext } from '../../contexts/traffic-flow-absolute-chart.context'
import { SeriesMultiSelectInline } from '../traffic-flow-absolute-chart/traffic-flow-absolute-chart-multiple-select-inline.component'

export function ChartGradientLineMultiSelectSeriesInline() {
  const { series, selectedSeries, setSelectedSeries } =
    useTrafficFlowAbsoluteChartContext()

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
