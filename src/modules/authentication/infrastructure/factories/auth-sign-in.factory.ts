import { AuthSignInRepository } from '../repositories/auth-sign-in.repository'
import { AuthSignInService } from '../services/auth-sign-in.service'

export class AuthSignInFactory {
  private static authSignInServiceInstance: AuthSignInService | null = null

  public static create(): AuthSignInService {
    if (!this.authSignInServiceInstance) {
      const authSignInRepository = new AuthSignInRepository('credentials')
      this.authSignInServiceInstance = new AuthSignInService(
        authSignInRepository
      )
    }
    return this.authSignInServiceInstance
  }
}
