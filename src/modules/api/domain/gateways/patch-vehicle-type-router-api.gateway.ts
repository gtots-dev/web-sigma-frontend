import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { VehicleTypeEntity } from '@/modules/vehicles-types/domain/entities/vehicle-types.entity'

export interface PatchVehicleTypeRouterApiGateway {
  execute(
    vehicleType: VehicleTypeEntity
  ): Promise<HttpResponseInterface<VehicleTypeEntity>>
}
