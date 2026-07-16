import { MonitoringMenuRoot } from './monitoring-menu-root.component'
import { MonitoringMenuAccentBar } from './monitoring-menu-accent-bar.component'
import { MonitoringMenuHeader } from './monitoring-menu-header.component'
import { MonitoringMenuConnection } from './monitoring-menu-connection.component'
import { MonitoringMenuFooter } from './monitoring-menu-footer.component'
import { MonitoringMenuDetails } from './monitoring-menu-details.component'

export const Menu = Object.assign(MonitoringMenuRoot, {
  AccentBar: MonitoringMenuAccentBar,
  Header: MonitoringMenuHeader,
  Connection: MonitoringMenuConnection,
  Footer: MonitoringMenuFooter,
  Details: MonitoringMenuDetails
})
