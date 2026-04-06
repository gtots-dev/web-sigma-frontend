import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { GetFileS3RouterApiGateway } from '../../domain/gateways/get-file-s3-router-api.gateway'
import type { HttpResponseInterface } from '../../../shared/domain/interfaces/http-response.interface'

export class GetFileS3RouterApiService implements GetFileS3RouterApiGateway {
  constructor(private readonly executeRequest: ExecuteRequest) {}

  getHttpRequestConfig(url: string): HttpRequestConfig {
    return {
      method: 'POST',
      data: {
        url: url
      },
      url: `api/s3`
    }
  }

  async execute(url: string): Promise<HttpResponseInterface<File>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(url)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
