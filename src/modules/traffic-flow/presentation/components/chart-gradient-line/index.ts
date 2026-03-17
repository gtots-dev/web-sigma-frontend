import { ChartGradientLineProvider } from './chart-gradient-line-provider.component'
import { ChartGradientLineToolbar } from './chart-gradient-line-toolbar.component'
import { ChartGradientLineScrollArea } from './chart-gradient-line-scroll-area.component'
import { ChartGradientLineChart } from './chart-gradient-line-chart.component'
import { ChartGradientLineGrid } from './chart-gradient-line-grid.component'
import { ChartGradientLineXAxis } from './chart-gradient-line-x-axis.component'
import { ChartGradientLineYAxis } from './chart-gradient-line-y-axis.component'
import { ChartGradientLineZoomArea } from './chart-gradient-line-zoom-area.component'
import { TrafficFlowChartAreas } from './chart-gradient-line-areas.component'
import { TrafficFlowChartGradients } from './chart-gradient-line-gradients.component'
import { ChartGradientLineRefreshButton } from './chart-gradient-line-refresh.component'
import { ChartGradientLineMultiSelectSeries } from './chart-gradient-line-multi-select-series.component'
import { ChartGradientLineResetZoom } from './chart-gradient-line-reset-zoom.component'
import { ChartGradientLineLockScroll } from './chart-gradient-line-lock-scroll.component'
import { ChartGradientLineLegend } from './chart-gradient-line-legend.component'
import { ChartGradientLineMultiSelectSeriesInline } from './chart-gradient-line-multi-select-series-inline.component'

export const ChartGradientLine = {
  Provider: ChartGradientLineProvider,
  Toolbar: ChartGradientLineToolbar,
  Refresh: ChartGradientLineRefreshButton,
  ResetZoom: ChartGradientLineResetZoom,
  MultiSelectSeries: ChartGradientLineMultiSelectSeries,
  MultiSelectSeriesInline: ChartGradientLineMultiSelectSeriesInline,
  Legend: ChartGradientLineLegend,
  LockScroll: ChartGradientLineLockScroll,
  ScrollArea: ChartGradientLineScrollArea,
  Chart: ChartGradientLineChart,
  Grid: ChartGradientLineGrid,
  XAxis: ChartGradientLineXAxis,
  YAxis: ChartGradientLineYAxis,
  ZoomArea: ChartGradientLineZoomArea,
  Areas: TrafficFlowChartAreas,
  Gradients: TrafficFlowChartGradients
}
