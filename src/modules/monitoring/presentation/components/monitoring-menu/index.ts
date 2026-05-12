import { MonitoringMenuRoot } from './monitoring-menu-root.component'
import { MonitoringMenuAccentBar } from './monitoring-menu-accent-bar.component'
import { MonitoringMenuStatusBar } from './monitoring-menu-status-bar.component'
import { MonitoringMenuHeader } from './monitoring-menu-header.component'
import { MonitoringMenuHealth } from './monitoring-menu-health.component'
import { MonitoringMenuConnection } from './monitoring-menu-connection.component'
import { MonitoringMenuMeta } from './monitoring-menu-meta.component'
import { MonitoringMenuFooter } from './monitoring-menu-footer.component'

import { MonitoringMenuPayload } from './monitoring-menu-payload.component'
import { MonitoringMenuTimestamp } from './monitoring-menu-timestamp.component'

export const Menu = Object.assign(MonitoringMenuRoot, {
  AccentBar: MonitoringMenuAccentBar,
  StatusBar: MonitoringMenuStatusBar,
  Header: MonitoringMenuHeader,
  Health: MonitoringMenuHealth,
  Connection: MonitoringMenuConnection,
  Meta: MonitoringMenuMeta,
  Payload: MonitoringMenuPayload,
  Timestamp: MonitoringMenuTimestamp,
  Footer: MonitoringMenuFooter
})
