import type { AuthSignOutConfigInterface } from '../interfaces/auth-sign-out-config.interface'

export interface AuthSignOutGateway {
  execute(signOutProps: AuthSignOutConfigInterface): Promise<void>
}
