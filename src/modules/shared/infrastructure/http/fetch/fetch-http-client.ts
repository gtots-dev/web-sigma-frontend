import type { HttpRequestConfig } from '../../../domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '../../../domain/interfaces/http-response.interface'
import type { HttpClientInterface } from '../../../domain/interfaces/http-client.interface'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'

export class FetchHttpClient implements HttpClientInterface {
  constructor(private readonly baseURL: string) {}

  async request<T, TData extends BodyInit | object = object, TParams = unknown>(
    config: HttpRequestConfig<TData, TParams>
  ): Promise<HttpResponse<T>> {
    try {
      const queryString = this.buildQueryString(
        config.params as Record<
          string,
          string | number | boolean | string[] | number[]
        >
      )

      const isFormData = config.data instanceof FormData
      const isJson =
        config.data && typeof config.data !== 'string' && !isFormData

      const headers = {
        ...(isJson ? { 'Content-Type': 'application/json' } : {}),
        ...config.headers
      }

      const response = await fetch(
        `${this.baseURL}${config.url}${queryString}`,
        {
          method: config.method,
          headers,
          body: isJson
            ? JSON.stringify(config.data)
            : (config.data as BodyInit | null),
          cache: 'no-cache'
        }
      )

      const contentType = response.headers.get('content-type') || ''

      let parsedData: T
      if (response.status === 204) {
        parsedData = null as unknown as T
      } else if (contentType.includes('application/json')) {
        parsedData = (await response.json()) as T
      } else if (
        contentType.includes('image/png') ||
        contentType.includes('image/jpeg') ||
        contentType.includes('image/jpg') ||
        contentType.includes('application/pdf') ||
        contentType.includes('application/octet-stream')
      ) {
        parsedData = (await response.blob()) as T
      } else {
        parsedData = (await response.text()) as T
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

  private buildQueryString(
    params?: Record<string, string | number | boolean | string[] | number[]>
  ): string {
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
