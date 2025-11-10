import { OperationFormContextProviderComponent } from './operation-form-provider.component'
import { OperationFormComponent } from './operation-form.component'
import { OperationFormSubmitComponent } from './operation-form-submit.component'
import { OperationFormTypeSelectorComponent } from './operation-form-type-selector.component'
import { OperationFormSearchComponent } from './operation-form-search.component'

export const OperationForm = {
  Provider: OperationFormContextProviderComponent,
  Form: OperationFormComponent,
  Radios: OperationFormTypeSelectorComponent,
  Search: OperationFormSearchComponent,
  Submit: OperationFormSubmitComponent
}
