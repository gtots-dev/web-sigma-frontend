import type { HttpRequestConfig } from '../interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '../interfaces/http-response.interface'

export interface HttpClientGateway {
  request<
    T,
    TData = unknown,
    TParams = unknown,
    THeaders = Record<string, string>
  >(
    config: HttpRequestConfig<TData, TParams>
  ): Promise<HttpResponseInterface<T, THeaders>>
}
