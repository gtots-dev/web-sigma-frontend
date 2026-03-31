import { VehicleFormInputEnabledComponent } from './vehicle-type-form-input-enabled.component'
import { VehicleFormInputNameComponent } from './vehicle-type-form-input-name.component'
import { VehicleFormSubmitComponent } from './vehicle-type-form-submit.component'
import { ColorPickerFormField } from './vehicle-type-form-input-color-picker.component'
import { VehicleFormInputCodeComponent } from './vehicle-type-form-input-code.component'
import { VehicleFormComponent } from './vehicle-type-form.component'

export const VehicleTypeForm = {
  Form: VehicleFormComponent,
  Submit: VehicleFormSubmitComponent,
  Input: {
    Name: VehicleFormInputNameComponent,
    Enabled: VehicleFormInputEnabledComponent,
    Code: VehicleFormInputCodeComponent,
    ColorPicker: ColorPickerFormField
  }
}
