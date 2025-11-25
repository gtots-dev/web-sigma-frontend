import { PointFormInputCfgComponent } from './point-form-input-cfg.component'
import { PointFormInputEnabledComponent } from './point-form-input-enabled.component'
import { PointFormInputNameComponent } from './point-form-input-name.component'
import { PointFormSubmitComponent } from './point-form-submit.component'
import { PointFormComponent } from './point-form.component'
import { PointFormInputDescriptionComponent } from './point-form-input-description.component'
import { PointFormInputLanesComponent } from './point-form-input-lanes.component'

export const PointForm = {
  Form: PointFormComponent,
  Submit: PointFormSubmitComponent,
  Input: {
    Name: PointFormInputNameComponent,
    cfg: PointFormInputCfgComponent,
    Description: PointFormInputDescriptionComponent,
    Enabled: PointFormInputEnabledComponent,
    Lanes: PointFormInputLanesComponent
  }
}
