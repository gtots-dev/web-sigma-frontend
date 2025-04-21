'use client'

import { UserFormInputCompanyComponent } from './user-form-input-company.component'
import { UserFormInputEmailComponent } from './user-form-input-email.component'
import { UserFormInputNameComponent } from './user-form-input-name.component'
import { UserFormInputPasswordComponent } from './user-form-input-password.component'
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
    Password: UserFormInputPasswordComponent,
    Position: UserFormInputPositionComponent,
    Company: UserFormInputCompanyComponent
  }
}
