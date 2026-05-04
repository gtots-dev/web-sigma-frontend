import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { VehiclesTypesInterface } from '../../domain/interfaces/vehicle-type.interface'
import type { GetVehiclesTypesServiceGateway } from '../../domain/gateways/get-vehicles-types-service.gateway'

export class GetVehiclesTypesService implements GetVehiclesTypesServiceGateway {
  constructor(
    private readonly executeRequest: ExecuteRequest,
    private readonly params: UrlParams
  ) {}

  getHttpRequestConfig(): HttpRequestConfig {
    return {
      method: 'GET',
      url: `/operations/${this.params.operationId}/contracts/${this.params.contractId}/vehicle-types`,
      requiresAuth: true
    }
  }

  async execute(): Promise<HttpResponseInterface<VehiclesTypesInterface[]>> {
    const settingsAuthHTTP = this.getHttpRequestConfig()
    return await this.executeRequest.execute(settingsAuthHTTP)
  }
}
