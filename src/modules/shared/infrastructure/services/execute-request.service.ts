import type { HttpClientGateway } from '../../domain/gateways/http-client.gateway'
import type { HttpRequestConfig } from '../../domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '../../domain/interfaces/http-response.interface'

export type RequestInterceptor = (
  config: HttpRequestConfig
) => Promise<HttpRequestConfig> | HttpRequestConfig

export class ExecuteRequest {
  constructor(
    private readonly httpClient: HttpClientGateway,
    private readonly interceptors: RequestInterceptor[] = []
  ) {}

  async execute<T, THeaders = Record<string, string | string[] | undefined>>(
    config: HttpRequestConfig
  ): Promise<HttpResponseInterface<T, THeaders>> {
    let finalConfig = { ...config }

    for (const interceptor of this.interceptors) {
      finalConfig = await interceptor(finalConfig)
    }

    return this.httpClient.request<T, unknown, unknown, THeaders>(finalConfig)
  }
}
