import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { VehicleEntity } from '../entities/vehicle-types.entity'

export interface PostVehicleTypeServiceGateway {
  execute(
    vehicleType: VehicleEntity
  ): Promise<HttpResponseInterface<VehicleEntity>>
}
