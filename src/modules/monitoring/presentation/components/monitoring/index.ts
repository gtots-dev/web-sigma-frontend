import { Controls } from '../monitoring-controls'
import { Header } from '../monitoring-header'
import { View } from '../monitoring-view'
import { Menu } from '../monitoring-menu'
import { Legend } from '../monitoring-legend'
import { Stats } from '../monitoring-stats'
import { MonitoringTooltip as Tooltip } from '../monitoring-tooltip'
import { MonitoringProvider, MonitoringConsumer } from './monitoring-context.component'
import { MonitoringContent } from './monitoring-content.component'
import { MonitoringLoading } from './monitoring-loading.component'
import { MonitoringError } from './monitoring-error.component'
import { SidebarFilters } from '../monitoring-sidebar-filters'

export const Monitoring = {
  Root: MonitoringProvider,
  Consumer: MonitoringConsumer,
  Content: MonitoringContent,
  Header,
  View,
  Controls,
  Menu,
  Legend,
  Stats,
  Tooltip,
  Loading: MonitoringLoading,
  Error: MonitoringError,
  SidebarFilters
}
