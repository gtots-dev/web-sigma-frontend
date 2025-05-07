import type { HttpRequestConfig } from '../../../domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '../../../domain/interfaces/http-response.interface'
import type { HttpClientInterface } from '../../../domain/interfaces/http-client.interface'

export class FetchHttpClient implements HttpClientInterface {
  constructor(private readonly baseURL: string) {}

  async request<T, TData = unknown, TParams = unknown>(
    config: HttpRequestConfig<TData, TParams>
  ): Promise<HttpResponse<T>> {
    try {
      const queryString = this.buildQueryString(
        config.params as Record<string, any>
      )
      const response = await fetch(
        `${this.baseURL}${config.url}${queryString}`,
        {
          method: config.method,
          headers: {
            ...config.headers
          },
          body:
            typeof config.data === 'string' || config.data instanceof FormData
              ? config.data
              : config.data
                ? JSON.stringify(config.data)
                : undefined,
          cache: 'no-cache'
        }
      )

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

  private buildQueryString(params?: Record<string, any>): string {
    if (!params) return ''
    const query = new URLSearchParams()

    for (const key in params) {
      const value = params[key]
      if (Array.isArray(value)) {
        value.forEach((val) => query.append(key, String(val)))
      } else if (value !== undefined && value !== null) {
        query.append(key, String(value))
      }
    }

    const queryString = query.toString()
    return queryString ? `?${queryString}` : ''
  }

  private safeParseJSON<T>(text: string): T | null {
    if (!text) return null
    try {
      return JSON.parse(text) as T
    } catch {
      return null
    }
  }
}
