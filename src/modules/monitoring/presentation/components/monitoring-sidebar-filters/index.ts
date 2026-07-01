import { MonitoringSidebarFilters } from './monitoring-sidebar-filters-root.component'
import { MonitoringSidebarFiltersTrigger } from './monitoring-sidebar-filters-trigger.component'
import { MonitoringSidebarFiltersContent } from './monitoring-sidebar-filters-content.component'
import { MonitoringSidebarFiltersItem } from './monitoring-sidebar-filters-item.component'

export const SidebarFilters = Object.assign(MonitoringSidebarFilters, {
  Trigger: MonitoringSidebarFiltersTrigger,
  Content: MonitoringSidebarFiltersContent,
  Item: MonitoringSidebarFiltersItem
})
