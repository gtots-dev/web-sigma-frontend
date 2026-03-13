import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { VehiclesTypesInterface } from '@/modules/vehicles-types/domain/interfaces/vehicle-type.interface'
import type { GetVehiclesTypesRouterApiGateway } from '../../domain/gateways/get-vehicles-types-router-api.gateway'

export class GetVehiclesTypesRouterApiService implements GetVehiclesTypesRouterApiGateway {
  constructor(
    private readonly httpRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/vehicles-types`
    }
  }
  async execute(): Promise<HttpResponseInterface<VehiclesTypesInterface[]>> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.httpRequest.execute<VehiclesTypesInterface[]>(
      settingsAuthHTTP
    )
  }
}
