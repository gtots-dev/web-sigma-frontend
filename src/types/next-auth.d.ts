import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    token?: TokenEntities
  }

  interface User {
    accessToken?: string
    username?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}
