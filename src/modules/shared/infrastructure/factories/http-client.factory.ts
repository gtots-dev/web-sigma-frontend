import { AxiosHttpClient } from '../http/axios/axios-http-client'

export class HttpClientFactory {
  private static instance: AxiosHttpClient | null = null

  static create(baseURL: string): AxiosHttpClient {
    if (!this.instance) {
      this.instance = new AxiosHttpClient(baseURL)
    }
    return this.instance
  }
}
