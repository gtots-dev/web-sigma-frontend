import CredentialsProvider from 'next-auth/providers/credentials'
import type { AuthenticatedUserInterface } from '../../domain/interfaces/authenticate-user.interface'
import { TokenService } from '../services/token.service'
import { HttpClientFactory } from '@/modules/shared/infrastructure/factories/http-client.factory'
import { ExecuteRequestFactory } from '@/modules/shared/infrastructure/factories/request.factory'
import { InvalidAuthError } from './error.auth'
import { TokenValidatorFactory } from '../factories/token-validator.factory'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

const httpClient = HttpClientFactory.create(process.env.HOST_API)
const executeRequest = ExecuteRequestFactory.create(httpClient)
const tokenValidator = TokenValidatorFactory.create(
  process.env.SECRET_KEY_ACCESS_TOKEN
)
const tokenService = new TokenService(executeRequest, tokenValidator)

export const CredentialsProviderAuth = CredentialsProvider({
  async authorize(
    credentials?: Record<string, string>
  ): Promise<AuthenticatedUserInterface> {
    try {
      const { access_token, token_type } = await tokenService.getToken({
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
