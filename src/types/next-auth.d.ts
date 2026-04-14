import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    authType: '2fa_pending' | 'access'
    token?: TokenEntities
  }

  interface User {
    accessToken?: string
    username?: string
    isAdmin: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    authType: '2fa_pending' | 'access'
    access_token?: string
  }
}
