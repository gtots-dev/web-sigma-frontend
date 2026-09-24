import { MonitoringViewRoot } from './monitoring-view-root.component'
import { MonitoringViewBackgroundPattern } from './monitoring-view-background-pattern.component'
import { MonitoringViewLayer } from './monitoring-view-layer.component'
import { Map } from '../monitoring-map'

export const View = Object.assign(MonitoringViewRoot, {
  Background: MonitoringViewBackgroundPattern,
  Layer: MonitoringViewLayer,
  Map
})


