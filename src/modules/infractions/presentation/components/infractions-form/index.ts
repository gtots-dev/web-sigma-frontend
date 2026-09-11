import { InfractionsFormComponent } from './infractions-form.component'
import { InfractionsFormInputDateComponent } from './infractions-form-input-date.component'
import { InfractionsFormInputGroupsComponent } from './infractions-form-input-groups.component'
import { InfractionsFormInputLanesComponent } from './infractions-form-input-lanes.component'
import { InfractionsFormInputPointsComponent } from './infractions-form-input-points.component'
import { InfractionsFormInputRestrictionsComponent } from './infractions-form-input-restrictions.component'
import { InfractionsFormInputTimeComponent } from './infractions-form-input-time.component'
import { InfractionsFormInputViolationsComponent } from './infractions-form-input-violations.component'
import { InfractionsFormSubmitComponent } from './infractions-form-submit.component'

export const InfractionsForm = {
  Form: InfractionsFormComponent,
  Submit: InfractionsFormSubmitComponent,
  Inputs: {
    Points: InfractionsFormInputPointsComponent,
    Lanes: InfractionsFormInputLanesComponent,
    Groups: InfractionsFormInputGroupsComponent,
    Violations: InfractionsFormInputViolationsComponent,
    Restrictions: InfractionsFormInputRestrictionsComponent,
    Date: InfractionsFormInputDateComponent,
    Time: InfractionsFormInputTimeComponent
  }
}
