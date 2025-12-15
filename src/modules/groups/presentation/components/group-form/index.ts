import { GroupFormInputCfgComponent } from './group-form-input-cfg.component'
import { GroupFormInputEnabledComponent } from './group-form-input-enabled.component'
import { GroupFormInputNameComponent } from './group-form-input-name.component'
import { GroupFormSubmitComponent } from './group-form-submit.component'
import { GroupFormComponent } from './group-form.component'
import { GroupFormInputDescriptionComponent } from './group-form-input-description.component'
import { GroupFormInputLanesComponent } from './group-form-input-lanes.component'
import { GroupFormInputPointsComponent } from './group-form-input-points.component'
import { GroupFormInputSubgroupsComponent } from './group-form-input-subgroups.component'

export const GroupForm = {
  Form: GroupFormComponent,
  Submit: GroupFormSubmitComponent,
  Input: {
    Name: GroupFormInputNameComponent,
    cfg: GroupFormInputCfgComponent,
    Description: GroupFormInputDescriptionComponent,
    Enabled: GroupFormInputEnabledComponent,
    Lanes: GroupFormInputLanesComponent,
    Points: GroupFormInputPointsComponent,
    Subgroups: GroupFormInputSubgroupsComponent
  }
}
