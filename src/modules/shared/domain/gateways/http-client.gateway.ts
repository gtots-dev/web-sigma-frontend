import type { HttpRequestConfig } from '../interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '../interfaces/http-response.interface'

export interface HttpClientGateway {
  request<T>(config: HttpRequestConfig): Promise<HttpResponseInterface<T>>
}
