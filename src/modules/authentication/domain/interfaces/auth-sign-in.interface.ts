import type { AuthSignInConfigInterface } from './auth-sign-in-config.interface'

export interface AuthSignInInterface<T> {
  execute(signInProps: AuthSignInConfigInterface): Promise<T>
}
