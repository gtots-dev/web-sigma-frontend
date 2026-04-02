import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetVehiclesTypesFactory } from '@/modules/vehicles-types/infrastructure/factories/get-vehicles-types.factory'
import { PostVehicleTypeFactory } from '@/modules/vehicles-types/infrastructure/factories/post-vehicle-type.factory'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.POST<UrlParams>(
  async ({ operationId, contractId }) => {
    const getVehiclesTypes = GetVehiclesTypesFactory.create({
      operationId,
      contractId
    })
    return await getVehiclesTypes.execute()
  }
)

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, contractId }, req) => {
    const vehicleType = await req?.json()
    const postVehicleType = PostVehicleTypeFactory.create({
      operationId,
      contractId
    })
    return await postVehicleType.execute(vehicleType)
  }
)
