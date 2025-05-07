import { FetchHttpClient } from '../http/fetch/fetch-http-client'

export class HttpClientFactory {
  static create(baseURL: string): FetchHttpClient {
    const client = new FetchHttpClient(baseURL)
    return client
  }
}
