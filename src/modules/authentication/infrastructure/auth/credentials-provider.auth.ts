import CredentialsProvider from 'next-auth/providers/credentials'
import type { AuthenticatedUserInterface } from '../../domain/interfaces/authenticate-user.interface'
import { InvalidAuthError } from './error.auth'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { TokenFactory } from '../factories/token.factory'

export const CredentialsProviderAuth = CredentialsProvider({
  async authorize(
    credentials?: Record<string, string>
  ): Promise<AuthenticatedUserInterface> {
    const token = TokenFactory.create()
    try {
      const { access_token, token_type } = await token.getToken({
        username: credentials?.username,
        password: credentials?.password
      })

      return {
        id: crypto.randomUUID(),
        username: credentials?.username,
        accessToken: access_token,
        tokenType: token_type
      }
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw new InvalidAuthError(error.message)
      }
    }
  }
})
