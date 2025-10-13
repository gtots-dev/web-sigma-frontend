import { ContractFormContextProviderComponent } from './contract-form-provider.component'
import { ContractFormComponent } from './contract-form.component'
import { ContractFormSubmitComponent } from './contract-form-submit.component'
import { ContractFormTypeSelectorComponent } from './contract-form-type-selector.component'
import { ContractFormSearchComponent } from './contract-form-search.component'

export const ContractForm = {
  Provider: ContractFormContextProviderComponent,
  Form: ContractFormComponent,
  Radios: ContractFormTypeSelectorComponent,
  Search: ContractFormSearchComponent,
  Submit: ContractFormSubmitComponent
}
