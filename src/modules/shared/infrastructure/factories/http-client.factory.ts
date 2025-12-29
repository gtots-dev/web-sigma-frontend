import { FetchHttpClient } from '../http/fetch/ fetch-http-client'
import { parseResponseBody } from '../http/fetch/dependencies/parse-response-body'
import { resolveBodyAndHeaders } from '../http/fetch/dependencies/resolve-body-and-headers'
import { ExtractErrorMessageFactory } from './extract-error-message.factory'

export class HttpClientFactory {
  static create(baseURL: string): FetchHttpClient {
    const extractErrorMessage = ExtractErrorMessageFactory.create()
    return new FetchHttpClient(
      baseURL,
      resolveBodyAndHeaders,
      parseResponseBody,
      extractErrorMessage
    )
  }
}
