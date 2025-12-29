import type { HttpClientGateway } from '@/modules/shared/domain/gateways/http-client.gateway'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { buildQueryString } from './query/build-query-string'
import type { QueryParams } from './query/types'
import type { ResolveBodyAndHeaders } from './dependencies/resolve-body-and-headers'
import type { ParseResponseBody } from './dependencies/parse-response-body'
import type { ExtractErrorMessage } from './dependencies/extract-error-message'

export class FetchHttpClient implements HttpClientGateway {
  constructor(
    private readonly baseURL: string,
    private readonly resolveBodyAndHeaders: ResolveBodyAndHeaders,
    private readonly parseResponseBody: ParseResponseBody,
    private readonly extractErrorMessage: ExtractErrorMessage
  ) {}

  async request<T, TData = unknown, TParams = unknown>(
    config: HttpRequestConfig<TData, TParams>
  ): Promise<HttpResponse<T>> {
    try {
      const queryString = buildQueryString(config.params as QueryParams)

      const { body, headers } = this.resolveBodyAndHeaders(
        config.data,
        config.headers
      )

      const response = await fetch(
        `${this.baseURL}${config.url}${queryString}`,
        {
          method: config.method,
          headers,
          body,
          cache: 'no-cache'
        }
      )

      const parsedData = await this.parseResponseBody<T>(response)

      if (!response.ok) {
        return {
          success: false,
          status: String(response.status),
          message: this.extractErrorMessage.extract(parsedData),
          data: null
        }
      }

      return {
        success: true,
        status: String(response.status),
        data: parsedData
      }
    } catch (error) {
      return {
        success: false,
        status: String(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR),
        message: error instanceof Error ? error.message : 'Erro inesperado',
        data: null
      }
    }
  }
}
