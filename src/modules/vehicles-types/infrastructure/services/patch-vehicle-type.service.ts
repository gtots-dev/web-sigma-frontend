import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { PatchVehicleTypeServiceGateway } from '../../domain/gateways/patch-vehicle-type-service.gateway'
import type { VehicleTypeEntity } from '../../domain/entities/vehicle-types.entity'

export class PatchVehicleTypeService implements PatchVehicleTypeServiceGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(
    vehicleType: VehicleTypeEntity
  ): HttpRequestConfig {
    return {
      method: 'PATCH',
      url: `/operations/${this.params.operationId}/contracts/${this.params.contractId}/vehicle-types/${this.params.vehicleTypeId}`,
      data: vehicleType,
      requiresAuth: true
    }
  }

  async execute(
    vehicleType: VehicleTypeEntity
  ): Promise<HttpResponseInterface<VehicleTypeEntity>> {
    const settingsAuthHTTP = this.getHttpRequestConfig(vehicleType)
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
