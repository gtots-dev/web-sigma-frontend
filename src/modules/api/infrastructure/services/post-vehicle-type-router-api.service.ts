import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { VehicleEntity } from '@/modules/vehicles-types/domain/entities/vehicle-types.entity'
import type { PostVehicleTypeRouterApiGateway } from '../../domain/gateways/post-vehicle-type-router-api.gateway'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export class PostVehicleTypeRouterApiService implements PostVehicleTypeRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(vehicleType: VehicleEntity): HttpRequestConfig {
    return {
      method: 'POST',
      data: vehicleType,
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/vehicles-types`
    }
  }

  async execute(
    vehicleType: VehicleEntity
  ): Promise<HttpResponseInterface<VehicleEntity>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(vehicleType)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
