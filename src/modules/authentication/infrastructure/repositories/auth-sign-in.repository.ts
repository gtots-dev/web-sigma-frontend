import { signIn } from 'next-auth/react'
import type { AuthSignInConfigInterface } from '../../domain/interfaces/auth-sign-in-config.interface'

export class AuthSignInRepository {
  constructor(private readonly type: string) {}

  async execute(signInProps: AuthSignInConfigInterface) {
    return signIn(this.type, {
      ...signInProps.data,
      redirect: signInProps.options.redirect
    })
  }
}
