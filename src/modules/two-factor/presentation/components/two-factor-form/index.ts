'use client'

import { TwoFactorFormInputOTPComponent } from './two-factor-form-input-otp.component'
import { TwoFactorFormSubmitComponent } from './two-factor-form-submit.component'
import { TwoFactorFormComponent } from './two-factor-form.component'
import { TwoFactorResendCodeComponent } from './two-factor-form-input-resend.component'
import { TwoFactorFormCancelComponent } from './two-factor-form-cancel.component'

export const TwoFactorForm = {
  Form: TwoFactorFormComponent,
  Submit: TwoFactorFormSubmitComponent,
  Cancel: TwoFactorFormCancelComponent,
  Input: {
    otp: TwoFactorFormInputOTPComponent,
    resend: TwoFactorResendCodeComponent
  }
}
