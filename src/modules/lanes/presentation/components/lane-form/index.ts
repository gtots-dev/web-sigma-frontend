import { LaneFormInputCfgComponent } from "./lane-form-input-cfg.component";
import { LaneFormInputEnabledComponent } from "./lane-form-input-enabled.component";
import { LaneFormInputNameComponent } from "./lane-form-input-name.component";
import { LaneFormSubmitComponent } from "./lane-form-submit.component";
import { LaneFormComponent } from "./lane-form.component";

export const LaneForm = {
  Form: LaneFormComponent,
  Submit: LaneFormSubmitComponent,
  Input: {
    Name: LaneFormInputNameComponent,
    cfg: LaneFormInputCfgComponent,
    Enabled: LaneFormInputEnabledComponent
  }
}
