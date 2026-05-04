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
import type { ParseHeadersType } from './dependencies/parse-headers'

export class FetchHttpClient implements HttpClientGateway {
  constructor(
    private readonly baseURL: string,
    private readonly resolveBodyAndHeaders: ResolveBodyAndHeaders,
    private readonly parseResponseBody: ParseResponseBody,
    private readonly parseHeaders: ParseHeadersType,
    private readonly extractErrorMessage: ExtractErrorMessage
  ) {}

  request = async <
    T,
    TData = unknown,
    TParams = unknown,
    THeaders = Record<string, string>
  >(
    config: HttpRequestConfig<TData, TParams>
  ): Promise<HttpResponseInterface<T, THeaders>> => {
    const queryString = buildQueryString(
      config.params as HttpQueryParamsInterface
    )

    const { body, headers: resolvedHeaders } = this.resolveBodyAndHeaders(
      config.data,
      config.headers
    )

    let headers = { ...resolvedHeaders } as Record<string, string>

    let response: Response
    let parsedData: T
    let parsedHeaders: Record<string, string>

    try {
      console.log({
        url: `${this.baseURL}${config.url}${queryString}`,
        headers: headers
      })

      response = await fetch(`${this.baseURL}${config.url}${queryString}`, {
        method: config.method,
        headers,
        body,
        cache: 'no-cache'
      })

      parsedHeaders = this.parseHeaders(response.headers)
      parsedData = await this.parseResponseBody<T>(response)
    } catch (error) {
      console.log(error.message)

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
      data: parsedData,
      headers: parsedHeaders as THeaders
    }
  }
}
