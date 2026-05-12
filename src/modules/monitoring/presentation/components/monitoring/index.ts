import { Controls } from '../monitoring-controls'
import { Header } from '../monitoring-header'
import { View } from '../monitoring-view'
import { Menu } from '../monitoring-menu'
import { Legend } from '../monitoring-legend'
import { Stats } from '../monitoring-stats'
import { MonitoringProvider, MonitoringConsumer } from './monitoring-context.component'
import { MonitoringContent } from './monitoring-content.component'

export const Monitoring = {
  Root: MonitoringProvider,
  Consumer: MonitoringConsumer,
  Content: MonitoringContent,
  Header,
  View,
  Controls,
  Menu,
  Legend,
  Stats
}
