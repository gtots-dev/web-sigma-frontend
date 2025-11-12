import { signOut } from 'next-auth/react'

import type { AuthSignOutConfigInterface } from '../../domain/interfaces/auth-sign-out-config.interface'
import type { AuthSignOutGateway } from '../../domain/gateways/auth-sign-out.gateway'

export class AuthSignOutRepository implements AuthSignOutGateway {
  async execute({ options }: AuthSignOutConfigInterface) {
    await signOut({
      redirect: options.redirect as false
    })
  }
}
