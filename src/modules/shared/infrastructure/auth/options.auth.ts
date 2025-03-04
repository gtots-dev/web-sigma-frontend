import { type NextAuthConfig } from 'next-auth'
import { CredentialsProviderAuth } from './credentials-provider.auth'
import { JWTCallbackAuth } from './jwt-callback.auth'
import { SessionCallbackAuth } from './session-callback.auth'

export const OptionsAuth: NextAuthConfig = {
  providers: [CredentialsProviderAuth],
  callbacks: {
    jwt: JWTCallbackAuth,
    session: SessionCallbackAuth
  },
  pages: {
    signIn: '/authentication',
    signOut: '/system',
    error: '/',
    newUser: '/',
    verifyRequest: '/'
  }
}
