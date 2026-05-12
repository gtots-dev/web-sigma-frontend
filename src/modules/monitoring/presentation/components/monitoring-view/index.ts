import { MonitoringViewRoot } from './monitoring-view-root.component'
import { MonitoringViewBackgroundPattern } from './monitoring-view-background-pattern.component'
import { MonitoringViewLayer } from './monitoring-view-layer.component'

export const View = Object.assign(MonitoringViewRoot, {
  Background: MonitoringViewBackgroundPattern,
  Layer: MonitoringViewLayer
})
