import { signOut } from 'next-auth/react'

import type { AuthSignOutConfigInterface } from '../../domain/interfaces/auth-sign-out-config.interface'
import type { AuthSignOutInterface } from '../../domain/interfaces/auth-sign-out.interface'

export class AuthSignOutRepository implements AuthSignOutInterface {
  async execute({ options }: AuthSignOutConfigInterface) {
    await signOut({
      redirect: options.redirect
    })
  }
}
