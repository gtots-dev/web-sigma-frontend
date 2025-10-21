import { ProcessingUnitFormInputCfgComponent } from "./processing-unit-form-input-cfg.component";
import { ProcessingUnitFormInputEnabledComponent } from "./processing-unit-form-input-enabled.component";
import { ProcessingUnitFormInputNameComponent } from "./processing-unit-form-input-name.component";
import { ProcessingUnitFormSubmitComponent } from "./processing-unit-form-submit.component";
import { ProcessingUnitFormComponent } from "./processing-unit-form.component";

export const ProcessingUnitForm = {
  Form: ProcessingUnitFormComponent,
  Submit: ProcessingUnitFormSubmitComponent,
  Input: {
    Name: ProcessingUnitFormInputNameComponent,
    cfg: ProcessingUnitFormInputCfgComponent,
    Enabled: ProcessingUnitFormInputEnabledComponent
  }
}
