import type { AuthSignOutConfigInterface } from './auth-sign-out-config.interface'

export interface AuthSignOutInterface {
  execute(signOutProps: AuthSignOutConfigInterface): Promise<void>
}
