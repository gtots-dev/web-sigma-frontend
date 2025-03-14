import { AuthSignOutRepository } from '../repositories/auth-sign-out.repository'
import { AuthSignOutService } from '../services/auth-sign-out.service'

export class AuthSignOutFactory {
  private static authSignOutServiceInstance: AuthSignOutService | null = null

  public static create(): AuthSignOutService {
    if (!this.authSignOutServiceInstance) {
      const authSignOutRepository = new AuthSignOutRepository()
      this.authSignOutServiceInstance = new AuthSignOutService(
        authSignOutRepository
      )
    }
    return this.authSignOutServiceInstance
  }
}
