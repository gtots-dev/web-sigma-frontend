import type { HttpRequestConfig } from '../interfaces/http-request-config.interface'
import type { HttpResponse } from '../interfaces/http-response.interface'

export interface HttpClientGateway {
  request<T>(config: HttpRequestConfig): Promise<HttpResponse<T>>
}
