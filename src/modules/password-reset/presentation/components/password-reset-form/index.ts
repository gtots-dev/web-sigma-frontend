'use client'

import { PasswordResetFormInputPasswordConfirmComponent } from './password-reset-form-input-password-confirm.component'
import { PasswordResetFormInputPasswordComponent } from './password-reset-form-input-password.component'
import { PasswordResetFormSubmitComponent } from './password-reset-form-submit.component'
import { PasswordResetFormComponent } from './password-reset-form.component'

export const PasswordResetForm = {
  Form: PasswordResetFormComponent,
  Submit: PasswordResetFormSubmitComponent,
  Input: {
    Password: PasswordResetFormInputPasswordComponent,
    PasswordConfirm: PasswordResetFormInputPasswordConfirmComponent
  }
}
