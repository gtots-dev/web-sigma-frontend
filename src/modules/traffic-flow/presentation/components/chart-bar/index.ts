import { ChartBarProvider } from './chart-bar-provider.component'
import { ChartBarToolbar } from './chart-bar-toolbar.component'
import { ChartBarScrollArea } from './chart-bar-scroll-area.component'
import { ChartBarChart } from './chart-bar-chart.component'
import { ChartBarGrid } from './chart-bar-grid.component'
import { ChartBarXAxis } from './chart-bar-x-axis.component'
import { ChartBarYAxis } from './chart-bar-y-axis.component'
import { ChartBarZoomArea } from './chart-bar-zoom-area.component'
import { ChartBarAreas } from './chart-bar-areas.component'
import { ChartBarRefreshButton } from './chart-bar-refresh.component'
import { ChartBarMultiSelectSeries } from './chart-bar-multi-select-series.component'
import { ChartBarResetZoom } from './chart-bar-reset-zoom.component'
import { ChartBarLockScroll } from './chart-bar-lock-scroll.component'
import { ChartBarLegend } from './chart-bar-legend.component'

import { ChartBarTooltip } from './chart-bar-tooltip.component'
import { ChartBarMultiSelectSeriesInline } from './chart-bar-multi-select-series-inline.component'

export const ChartBar = {
  Provider: ChartBarProvider,
  Toolbar: ChartBarToolbar,
  Refresh: ChartBarRefreshButton,
  ResetZoom: ChartBarResetZoom,
  MultiSelectSeries: ChartBarMultiSelectSeries,
  MultiSelectSeriesInline: ChartBarMultiSelectSeriesInline,
  Legend: ChartBarLegend,
  LockScroll: ChartBarLockScroll,
  ScrollArea: ChartBarScrollArea,
  Chart: ChartBarChart,
  Grid: ChartBarGrid,
  XAxis: ChartBarXAxis,
  YAxis: ChartBarYAxis,
  ZoomArea: ChartBarZoomArea,
  Areas: ChartBarAreas,
  Tooltip: ChartBarTooltip
}
