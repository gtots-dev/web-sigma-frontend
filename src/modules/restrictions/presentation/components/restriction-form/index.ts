import { RestrictionFormComponent } from './restriction-form.component'
import { RestrictionFormInputNameComponent } from './restriction-form-input-name.component'
import { RestrictionFormInputCodeComponent } from './restriction-form-input-code.component'
import { RestrictionFormSubmitComponent } from './restriction-form-submit.component'

export const RestrictionForm = {
  Form: RestrictionFormComponent,
  Submit: RestrictionFormSubmitComponent,
  Input: {
    Name: RestrictionFormInputNameComponent,
    Code: RestrictionFormInputCodeComponent
  }
}
