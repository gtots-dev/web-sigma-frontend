import { MonitoringHeaderRoot } from './monitoring-header-root.component'
import { MonitoringHeaderSort } from './monitoring-header-sort-filter.component'
import { MonitoringHeaderFilter } from './monitoring-header-status-filter.component'
import { MonitoringHeaderConnectionFilter } from './monitoring-header-connection-filter.component'
import { MonitoringHeaderFiltersComponent } from './monitoring-header-filters.component'

export const Header = Object.assign(MonitoringHeaderRoot, {
  Filters: MonitoringHeaderFiltersComponent,
  SortFilter: MonitoringHeaderSort,
  StatusFilter: MonitoringHeaderFilter,
  ConnectionFilter: MonitoringHeaderConnectionFilter
})
