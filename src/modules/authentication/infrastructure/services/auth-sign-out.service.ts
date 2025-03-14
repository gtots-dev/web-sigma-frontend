import type { AuthSignOutRepository } from "../repositories/auth-sign-out.repository";

export class AuthSignOutService {
  constructor(private readonly authSignOut: AuthSignOutRepository) {}
  async signOut(): Promise<void> {
    await this.authSignOut.execute({
      options: {
        redirect: false
      }
    })
  }
}
