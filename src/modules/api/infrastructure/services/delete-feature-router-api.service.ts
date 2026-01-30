import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { DeleteFeatureRouterApiGateway } from '../../domain/gateways/delete-feature-router-api.gateway'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

export class DeleteFeatureRouterApiService implements DeleteFeatureRouterApiGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig({
    permissionProfileId,
    operationId,
    featureId
  }: UrlParams): HttpRequestConfig<number[]> {
    return {
      method: 'DELETE',
      url: `api/operations/${operationId}/permissions/${permissionProfileId}/features/${featureId}`
    }
  }
  async execute(): Promise<void> {
    const settingsAuthHTTP = this.getHttpRequestConfig(this.params)
    await this.httpRequest.execute(settingsAuthHTTP)
  }
}
