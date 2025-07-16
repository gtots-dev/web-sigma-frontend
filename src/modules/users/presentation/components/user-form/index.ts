'use client'

import { UserFormInputCompanyComponent } from './user-form-input-company.component'
import { UserFormInputDescriptionComponent } from './user-form-input-description.component'
import { UserFormInputEmailComponent } from './user-form-input-email.component'
import { UserFormInputEnabledComponent } from './user-form-input-enabled.component'
import { UserFormInputFilesComponent } from './user-form-input-files.component'
import { UserFormInputNameComponent } from './user-form-input-name.component'
import { UserFormInputPasswordDeadlineComponent } from './user-form-input-password-deadline.component'
import { UserFormInputPermissionProfilesComponent } from './user-form-input-permission-profiles.component'
import { UserFormInputContractsComponent } from './user-form-input-contracts.component'
import { UserFormInputPositionComponent } from './user-form-input-position.component'
import { UserFormInputUsernameComponent } from './user-form-input-username.component'
import { UserFormSubmitComponent } from './user-form-submit.component'
import { UserFormComponent } from './user-form.component'

export const UserForm = {
  Form: UserFormComponent,
  Submit: UserFormSubmitComponent,
  Input: {
    Name: UserFormInputNameComponent,
    Email: UserFormInputEmailComponent,
    Username: UserFormInputUsernameComponent,
    Position: UserFormInputPositionComponent,
    Company: UserFormInputCompanyComponent,
    Files: UserFormInputFilesComponent,
    Description: UserFormInputDescriptionComponent,
    PasswordRegDeadline: UserFormInputPasswordDeadlineComponent,
    Profiles: UserFormInputPermissionProfilesComponent,
    Contracts: UserFormInputContractsComponent,
    Enabled: UserFormInputEnabledComponent
  }
}
