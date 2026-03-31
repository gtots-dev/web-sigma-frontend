import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { VehicleTypeEntity } from '@/modules/vehicles-types/domain/entities/vehicle-types.entity'
import type { PatchVehicleTypeRouterApiGateway } from '../../domain/gateways/patch-vehicle-type-router-api.gateway'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export class PatchVehicleTypeRouterApiService implements PatchVehicleTypeRouterApiGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}
  getHttpRequestConfig(vehicleType: VehicleTypeEntity): HttpRequestConfig {
    return {
      method: 'POST',
      data: vehicleType,
      url: `api/operations/${this.params.operationId}/contracts/${this.params.contractId}/vehicles-types/${this.params.VehicleTypeId}`
    }
  }

  async execute(
    vehicleType: VehicleTypeEntity
  ): Promise<HttpResponseInterface<VehicleTypeEntity>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(vehicleType)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
