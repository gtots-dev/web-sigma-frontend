import type { FetchHttpClient } from '../http/fetch/fetch-http-client'
import { nextAuthInterceptor } from '../interceptors/next-auth-interceptor'
import { nextCookieInterceptor } from '../interceptors/next-cookie.interceptor'
import { next2faInterceptor } from '../interceptors/next-2fa.interceptor'
import { ExecuteRequest } from '../services/execute-request.service'

export class ExecuteRequestFactory {
  static create(httpClient: FetchHttpClient): ExecuteRequest {
    return new ExecuteRequest(httpClient, [
      nextAuthInterceptor,
      nextCookieInterceptor,
      next2faInterceptor
    ])
  }
}
