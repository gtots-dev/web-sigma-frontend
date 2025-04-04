import { FetchHttpClient } from '../http/fetch/fetch-http-client'

export class HttpClientFactory {
  private static instance: FetchHttpClient | null = null

  static create(baseURL: string): FetchHttpClient {
    if (!this.instance) {
      this.instance = new FetchHttpClient(baseURL)
    }
    return this.instance
  }
}
