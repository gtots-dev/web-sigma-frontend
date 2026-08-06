import { ViolationFormComponent } from './violation-form.component'
import { ViolationFormInputNameComponent } from './violation-form-input-name.component'
import { ViolationFormInputCodeComponent } from './violation-form-input-code.component'
import { ColorPickerFormField } from './violation-form-input-color-picker.component'
import { ViolationFormSubmitComponent } from './violation-form-submit.component'

export const ViolationForm = {
  Form: ViolationFormComponent,
  Submit: ViolationFormSubmitComponent,
  Input: {
    Name: ViolationFormInputNameComponent,
    Code: ViolationFormInputCodeComponent,
    ColorPicker: ColorPickerFormField
  }
}
