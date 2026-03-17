import { useTrafficFlowChartContext } from '../../contexts/traffic-flow-chart.context'
import { SeriesMultiSelectInline } from '../traffic-flow-chart/traffic-flow-chart-multiple-select-inline.component'

export function ChartGradientLineMultiSelectSeriesInline() {
  const { series, selectedSeries, setSelectedSeries } =
    useTrafficFlowChartContext()

  return (
    <div className="bg-white dark:bg-black border rounded-md p-3">
      <SeriesMultiSelectInline
        className="!ms-auto"
        verticalAlign="center"
        series={series}
        value={selectedSeries}
        onChange={setSelectedSeries}
      />
    </div>
  )
}
