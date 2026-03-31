import { VehicleFormInputEnabledComponent } from './vehicle-form-input-enabled.component'
import { VehicleFormInputNameComponent } from './vehicle-form-input-name.component'
import { VehicleFormSubmitComponent } from './vehicle-form-submit.component'
import { VehicleFormComponent } from './vehicle-form.component'
import { ColorPickerFormField } from './vehicle-form-input-color-picker.component'
import { VehicleFormInputCodeComponent } from './vehicle-form-input-code.component'

export const VehicleForm = {
  Form: VehicleFormComponent,
  Submit: VehicleFormSubmitComponent,
  Input: {
    Name: VehicleFormInputNameComponent,
    Enabled: VehicleFormInputEnabledComponent,
    Code: VehicleFormInputCodeComponent,
    ColorPicker: ColorPickerFormField
  }
}
