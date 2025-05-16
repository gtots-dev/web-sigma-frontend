'use client'

import { ContractFormInputAliasComponent } from "./contract-form-input-alias.component"
import { ContractFormInputCfgComponent } from "./contract-form-input-cfg.component"
import { ContractFormInputNameComponent } from "./contract-form-input-name.component"
import { ContractFormSubmitComponent } from "./contract-form-submit.component"
import { ContractFormComponent } from "./contract-form.component"

export const ContractForm = {
  Form: ContractFormComponent,
  Submit: ContractFormSubmitComponent,
  Input: {
    Name: ContractFormInputNameComponent,
    Alias: ContractFormInputAliasComponent,
    cfg: ContractFormInputCfgComponent,
  }
}
