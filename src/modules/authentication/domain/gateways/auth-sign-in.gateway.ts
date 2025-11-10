import type { AuthSignInConfigInterface } from "../interfaces/auth-sign-in-config.interface";

export interface AuthSignGateway<T> {
  execute(signInProps: AuthSignInConfigInterface): Promise<T>
}
