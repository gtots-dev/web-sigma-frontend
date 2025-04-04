import type { HttpRequestConfig } from '../../../domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '../../../domain/interfaces/http-response.interface'
import type { HttpClientInterface } from '../../../domain/interfaces/http-client.interface'

export class FetchHttpClient implements HttpClientInterface {
  constructor(private readonly baseURL: string) {}

  async request<T>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    const url = `${this.baseURL}${config.url}`

    try {
      const response = await fetch(url, {
        method: config.method,
        headers: {
          ...config.headers
        },
        body: config.data,
        cache: 'no-cache'
      })

      const rawText = await response.text()
      const parsedData = this.safeParseJSON<T>(rawText)

      return {
        success: response.ok,
        status: String(response.status),
        data: response.ok ? parsedData : null,
        message: response.ok ? undefined : response.statusText
      }
    } catch (err) {
      const error = err as Error
      return {
        success: false,
        status: '500',
        data: null,
        message: error?.message
      }
    }
  }

  private safeParseJSON<T>(text: string): T | null {
    if (!text) return null
    try {
      return JSON.parse(text) as T
    } catch (error) {
      return error
    }
  }
}
