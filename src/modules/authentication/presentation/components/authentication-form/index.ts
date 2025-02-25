import { AuthenticationFormForgotPasswordComponent } from './authentication-form-forgot-password.component'
import { AuthenticationFormInputPasswordComponent } from './authentication-form-password-input.component'
import { AuthenticationFormRootComponent } from './authentication-form-root.component'
import { AuthenticationFormInputSubmitComponent } from './authentication-form-submit.component'
import { AuthenticationFormInputUsernameComponent } from './authentication-form-username-input.component'

export const AuthenticationForm = {
  Root: AuthenticationFormRootComponent,
  InputSubmit: AuthenticationFormInputSubmitComponent,
  InputUsername: AuthenticationFormInputUsernameComponent,
  InputPassword: AuthenticationFormInputPasswordComponent,
  ForgotPassword: AuthenticationFormForgotPasswordComponent
}
