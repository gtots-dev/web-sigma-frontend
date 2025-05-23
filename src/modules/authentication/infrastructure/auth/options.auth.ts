import { type NextAuthConfig } from 'next-auth'
import { CredentialsProviderAuth } from './credentials-provider.auth'
import { JWTCallbackAuth } from './jwt-callback.auth'
import { SessionCallbackAuth } from './session-callback.auth'
import { LoggerErrorAuth } from './logger-error.auth'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'

export const OptionsAuth: NextAuthConfig = {
  providers: [CredentialsProviderAuth],
  callbacks: {
    jwt: JWTCallbackAuth,
    session: SessionCallbackAuth
  },
  pages: {
    signIn: PATHNAMES.AUTHENTICATION,
    signOut: PATHNAMES.SYSTEM,
    error: '/',
    newUser: '/',
    verifyRequest: '/'
  },
  logger: {
    error: LoggerErrorAuth
  }
}
