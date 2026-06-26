import { MonitoringControlsRoot } from './monitoring-controls-root.component'
import { MonitoringControlsMinimizeToggle } from './monitoring-controls-minimize-toggle.component'
import { MonitoringControlsMaximizeToggle } from './monitoring-controls-maximize-toggle.component'
import { MonitoringControlsModeToggle } from './monitoring-controls-mode-toggle.component'
import { MonitoringControlsLayoutToggle } from './monitoring-controls-layout-toggle.component'
import { MonitoringControlsScalingSlider } from './monitoring-controls-scaling-slider.component'
import { MonitoringControlsResetView } from './monitoring-controls-reset-view.component'
import { MonitoringControlsTelemetryFilterToggle } from './monitoring-controls-telemetry-filter-toggle.component'

export const Controls = Object.assign(MonitoringControlsRoot, {
  MinimizeToggle: MonitoringControlsMinimizeToggle,
  MaximizeToggle: MonitoringControlsMaximizeToggle,
  ModeToggle: MonitoringControlsModeToggle,
  LayoutToggle: MonitoringControlsLayoutToggle,
  ScalingSlider: MonitoringControlsScalingSlider,
  ResetView: MonitoringControlsResetView,
  TelemetryFilterToggle: MonitoringControlsTelemetryFilterToggle
})
