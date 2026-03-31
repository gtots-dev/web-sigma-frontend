import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PatchVehicleTypeFactory } from '@/modules/vehicles-types/infrastructure/factories/patch-vehicle-type.factory'

const routerApi = RouterApiFactory.create()

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId, contractId, vehicleTypeId }, req) => {
    const vehicleType = await req?.json()
    const patchVehicleType = PatchVehicleTypeFactory.create({
      operationId,
      contractId,
      vehicleTypeId
    })
    return await patchVehicleType.execute(vehicleType)
  }
)
