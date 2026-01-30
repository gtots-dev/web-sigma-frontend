import type { HttpClientGateway } from '@/modules/shared/domain/gateways/http-client.gateway'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { buildQueryString } from './query/build-query-string'
import type { ResolveBodyAndHeaders } from './dependencies/resolve-body-and-headers'
import type { ParseResponseBody } from './dependencies/parse-response-body'
import type { ExtractErrorMessage } from './dependencies/extract-error-message'
import type { HttpQueryParamsInterface } from '@/modules/shared/domain/interfaces/http-query-params.interface'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

export class FetchHttpClient implements HttpClientGateway {
  constructor(
    private readonly baseURL: string,
    private readonly resolveBodyAndHeaders: ResolveBodyAndHeaders,
    private readonly parseResponseBody: ParseResponseBody,
    private readonly extractErrorMessage: ExtractErrorMessage
  ) {}

  async request<T, TData = unknown, TParams = unknown>(
    config: HttpRequestConfig<TData, TParams>
  ): Promise<HttpResponseInterface<T>> {
    const queryString = buildQueryString(
      config.params as HttpQueryParamsInterface
    )

    const { body, headers } = this.resolveBodyAndHeaders(
      config.data,
      config.headers
    )

    let response: Response
    let parsedData: unknown

    try {
      response = await fetch(`${this.baseURL}${config.url}${queryString}`, {
        method: config.method,
        headers,
        body,
        cache: 'no-cache'
      })

      parsedData = await this.parseResponseBody<T>(response)
    } catch (error) {
      throw new HttpResponseError(
        error instanceof Error ? error.message : 'Erro de rede',
        Number(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR)
      )
    }

    if (!response.ok) {
      throw new HttpResponseError(
        this.extractErrorMessage.extract(parsedData),
        response.status
      )
    }

    return {
      success: true,
      status: response.status,
      data: parsedData as T
    }
  }
}
