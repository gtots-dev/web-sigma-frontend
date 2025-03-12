import type { AuthenticationFormType } from '../../presentation/schemas/authentication-form.schema'
import { AuthMessagesError } from '../errors/auth-messages.error'
import type { AuthSignInRepository } from '../repositories/auth-sign-in.repository'

export class AuthSignInService {
  constructor(private readonly authSignIn: AuthSignInRepository) {}

  async signIn(data: AuthenticationFormType): Promise<string | null> {
    const { code, error } = await this.authSignIn.execute({
      data,
      type: 'credentials',
      options: { redirect: false }
    })
    if (error) return AuthMessagesError.message(code)
    return null
  }
}
