import { TrafficFlowFormSubmitComponent } from '@/modules/traffic-flow/presentation/components/traffic-flow-form/traffic-flow-form-submit.component'
import { TrafficFlowDateRangeComponent } from './traffic-flow-form-input-date.component'
import { TrafficFlowFormComponent } from './traffic-flow-form.component'
import { TrafficFlowTimeRangeComponent } from './traffic-flow-form-input-time.component'
import { TrafficFlowGranularityComponent } from './traffic-flow-form-input-granularity.component'
import { TrafficFlowPointsComponent } from './traffic-flow-form-input-points.component'
import { TrafficFlowLanesComponent } from './traffic-flow-form-input-lanes.component'
import { TrafficFlowGroupsComponent } from './traffic-flow-form-input-groups.component'

export const TrafficFlowForm = {
  Form: TrafficFlowFormComponent,
  Submit: TrafficFlowFormSubmitComponent,
  Inputs: {
    Points: TrafficFlowPointsComponent,
    Lanes: TrafficFlowLanesComponent,
    groups: TrafficFlowGroupsComponent,
    Granularity: TrafficFlowGranularityComponent,
    Time: TrafficFlowTimeRangeComponent,
    Date: TrafficFlowDateRangeComponent
  }
}
