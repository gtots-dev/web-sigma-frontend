import type { HttpRequestConfig } from '../../../domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '../../../domain/interfaces/http-response.interface'
import type { HttpClientInterface } from '../../../domain/interfaces/http-client.interface'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'

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

      const contentType = response.headers.get('content-type') || ''

      let parsedData: any
      if (contentType.includes('application/json')) {
        parsedData = await response.json()
      } else if (
        contentType.includes('image/png') ||
        contentType.includes('image/jpeg') ||
        contentType.includes('image/jpg') ||
        contentType.includes('application/pdf') ||
        contentType.includes('application/octet-stream')
      ) {    
        parsedData = await response.blob()
      } else {
        parsedData = await response.text()
      }

      const status = String(response.status)
      const success = response.ok

      if (!success) {
        throw {
          success,
          status,
          message: JSON.stringify(parsedData)
        }
      }
      return {
        success,
        status,
        data: parsedData
      }
    } catch (err) {
      if (err === HttpStatusCodeEnum.INTERNAL_SERVER_ERROR) {
        return {
          success: false,
          status: '500',
          message: err?.detail ?? 'Erro inesperado',
          data: null
        }
      }
      return err
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
}
