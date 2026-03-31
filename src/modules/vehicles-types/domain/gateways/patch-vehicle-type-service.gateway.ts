import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { VehicleTypeEntity } from '../entities/vehicle-types.entity'

export interface PatchVehicleTypeServiceGateway {
  execute(
    vehicleType: VehicleTypeEntity
  ): Promise<HttpResponseInterface<VehicleTypeEntity>>
}
