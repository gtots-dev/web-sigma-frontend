import CredentialsProvider from 'next-auth/providers/credentials'
import { FormDataConverterFactory } from '../../../shared/infrastructure/factories/form-data-converter.factory'
import { HttpClientFactory } from '../../../shared/infrastructure/factories/http-client.factory'
import { ExecuteRequest } from '../../../shared/infrastructure/services/execute-request.service'
import type { HttpResponse } from '../../../shared/domain/interfaces/http-response.interface'
import type { HttpRequestConfig } from '../../../shared/domain/interfaces/http-request-config.interface'
import type { AuthenticatedUserInterface } from '../../domain/interfaces/authenticate-user.interface'
import type { OAuthResponseInterface } from '../../domain/interfaces/o-auth-response.interface'

import { InvalidAuthError } from './error.auth'

const formDataConverter = FormDataConverterFactory.create()
const httpClient = HttpClientFactory.create(process.env.HOST_API)
const executeRequest = new ExecuteRequest(httpClient)

export const CredentialsProviderAuth = CredentialsProvider({
  async authorize(
    credentials?: Record<string, string>
  ): Promise<AuthenticatedUserInterface> {
    if (!credentials?.username || !credentials?.password)
      throw new InvalidAuthError('401')

    const settingsAuthHTTP: HttpRequestConfig = {
      method: 'POST',
      url: process.env.PATH_LOGIN_FOR_ACCESS_TOKEN,
      data: formDataConverter.execute(credentials),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    const { success, data, status }: HttpResponse<OAuthResponseInterface> =
      await executeRequest.execute(settingsAuthHTTP)

    if (success && data && status === '200') {
      return {
        id: crypto.randomUUID(),
        username: credentials.username,
        accessToken: data.access_token,
        tokenType: data.token_type
      }
    }

    throw new InvalidAuthError(status)
  }
})
