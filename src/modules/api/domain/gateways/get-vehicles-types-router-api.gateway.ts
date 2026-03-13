import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { VehiclesTypesInterface } from '@/modules/vehicles-types/domain/interfaces/vehicle-type.interface'

export interface GetVehiclesTypesRouterApiGateway {
  execute(): Promise<HttpResponseInterface<VehiclesTypesInterface[]>>
}
