import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { VehiclesTypesInterface } from '../interfaces/vehicle-type.interface'

export interface GetVehiclesTypesServiceGateway {
  execute(): Promise<HttpResponseInterface<VehiclesTypesInterface[]>>
}
