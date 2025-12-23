import type { HttpRequestConfig } from '../../../domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '../../../domain/interfaces/http-response.interface'
import type { HttpClientGateway } from '../../../domain/gateways/http-client.gateway'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'

export class FetchHttpClient implements HttpClientGateway {
  constructor(private readonly baseURL: string) {}

  async request<
    T,
    TData extends BodyInit | object = object,
    TParams = unknown
  >(config: HttpRequestConfig<TData, TParams>): Promise<HttpResponse<T>> {
    try {
      const queryString = this.buildQueryString(
        config.params as Record<
          string,
          string | number | boolean | string[] | number[]
        >
      )

      const isFormData = config.data instanceof FormData
      const isJson =
        config.data !== undefined &&
        typeof config.data !== 'string' &&
        !isFormData

      const headers: HeadersInit = {
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

      let parsedData: T | null

      if (String(response.status) == HttpStatusCodeEnum.NO_CONTENT) {
        parsedData = null
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

      if (!response.ok) {
        return {
          success: false,
          status: String(response.status),
          message:
            typeof parsedData === 'string'
              ? parsedData
              : JSON.stringify(parsedData),
          data: null
        }
      }

      return {
        success: true,
        status: String(response.status),
        data: parsedData as T
      }
    } catch (error) {
      return {
        success: false,
        status: String(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR),
        message:
          error instanceof Error
            ? error.message
            : 'Erro inesperado',
        data: null
      }
    }
  }

  private buildQueryString(
    params?: Record<string, string | number | boolean | string[] | number[]>
  ): string {
    if (!params) return ''

    const query = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => query.append(key, String(v)))
      } else if (value !== undefined && value !== null) {
        query.append(key, String(value))
      }
    })

    const queryString = query.toString()
    return queryString ? `?${queryString}` : ''
  }
}
