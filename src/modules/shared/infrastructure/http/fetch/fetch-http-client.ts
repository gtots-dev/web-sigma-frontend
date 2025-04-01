import type { HttpRequestConfig } from '../../../domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '../../../domain/interfaces/http-response.interface'
import type { HttpClientInterface } from '../../../domain/interfaces/http-client.interface'

export class FetchHttpClient implements HttpClientInterface {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async request<T>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    const fullUrl = `${this.baseURL}${config.url}`

    try {
      const response = await fetch(fullUrl, {
        method: config.method,
        headers: {
          ...config.headers
        },
        body: config.data
      })

      let data: any = null

      const text = await response.text()
      if (text) {
        try {
          data = JSON.parse(text)
        } catch (jsonError) {
          console.error('Failed to parse JSON:', jsonError)
        }
      }
      return {
        success: response.ok,
        status: String(response.status),
        data: response.ok ? data : null
      }
    } catch (error: any) {
      return {
        success: false,
        status: String(error.response?.status) || '500',
        data: null as any,
        message: error.message || 'Unexpected error occurred'
      }
    }
  }
}
