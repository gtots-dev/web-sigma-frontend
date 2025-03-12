import type { AuthenticationFormType } from '../../presentation/schemas/authentication-form.schema'

export interface AuthSignInConfigInterface {
  type: string
  data: AuthenticationFormType
  options: {
    redirect: boolean
  }
}
