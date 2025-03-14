import type { HttpRequestConfig } from './http-request-config.interface'
import type { HttpResponse } from './http-response.interface'

export interface HttpClientInterface {
  request<T>(config: HttpRequestConfig): Promise<HttpResponse<T>>
}
