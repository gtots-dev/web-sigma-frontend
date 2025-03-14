import type { AxiosHttpClient } from "../http/axios/axios-http-client"
import { ExecuteRequest } from "../services/execute-request.service"

export class ExecuteRequestFactory {
  private static instance: ExecuteRequest | null = null

  static create(httpClient: AxiosHttpClient): ExecuteRequest {
    if (!this.instance) {
      this.instance = new ExecuteRequest(httpClient)
    }
    return this.instance
  }
}
