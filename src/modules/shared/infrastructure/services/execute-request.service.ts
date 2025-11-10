import type { HttpClientGateway } from '../../domain/gateways/http-client.interface'
import type { HttpRequestConfig } from '../../domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '../../domain/interfaces/http-response.interface'

export class ExecuteRequest {
  constructor(private httpClient: HttpClientGateway) {}

  async execute<T>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    return this.httpClient.request<T>(config)
  }
}
