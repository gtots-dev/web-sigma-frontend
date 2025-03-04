import { AxiosHttpClient } from '../http/axios/axios-http-client'

export class HttpClientFactory {
  static create(baseURL: string): AxiosHttpClient {
    return new AxiosHttpClient(baseURL)
  }
}
