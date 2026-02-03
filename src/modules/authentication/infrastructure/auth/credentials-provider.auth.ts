import CredentialsProvider from 'next-auth/providers/credentials'
import type { AuthenticatedUserInterface } from '../../domain/interfaces/authenticate-user.interface'
import { InvalidAuthError } from './error.auth'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { TokenFactory } from '../factories/token.factory'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'

interface NextAuthUser extends AuthenticatedUserInterface {
  isAdmin: boolean
}

export const CredentialsProviderAuth = CredentialsProvider({
  async authorize(
    credentials?: Record<string, string>
  ): Promise<NextAuthUser | null> {
    const jwtFactory = JwtTokenDecodeFactory.create()
    const token = TokenFactory.create()
    try {
      const { access_token, token_type } = await token.getToken({
        username: credentials?.username,
        password: credentials?.password
      })
      const { id, login_name } = jwtFactory.decode(access_token)
      return {
        id: String(id),
        username: login_name,
        accessToken: access_token,
        tokenType: token_type,
        isAdmin: id === 1
      }
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw new InvalidAuthError(error.message, error)
      }
      return null
    }
  }
})
