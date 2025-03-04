import type { AxiosInstance } from 'axios'
import type { HttpRequestConfig } from '../../../domain/interfaces/http-request-config.interface'
import axios from 'axios'
import type { HttpResponse } from '../../../domain/interfaces/http-response.interface'
import type { HttpClientInterface } from '../../../domain/interfaces/http-client.interface'

export class AxiosHttpClient implements HttpClientInterface {
  private axiosInstance: AxiosInstance

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL })
  }

  async request<T>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    try {
      const response = await this.axiosInstance.request<T>(config)
      return {
        success: true,
        status: String(response.status),
        data: response.data
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
