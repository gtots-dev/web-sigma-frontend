import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { VehicleEntity } from '@/modules/vehicles-types/domain/entities/vehicle-types.entity'

export interface PostVehicleTypeRouterApiGateway {
  execute(
    vehicleType: VehicleEntity
  ): Promise<HttpResponseInterface<VehicleEntity>>
}
