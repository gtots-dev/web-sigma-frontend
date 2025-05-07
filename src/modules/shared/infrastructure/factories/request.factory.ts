import type { FetchHttpClient } from '../http/fetch/fetch-http-client'
import { ExecuteRequest } from '../services/execute-request.service'

export class ExecuteRequestFactory {
  static create(httpClient: FetchHttpClient): ExecuteRequest {
    return new ExecuteRequest(httpClient)
  }
}
