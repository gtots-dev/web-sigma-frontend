import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetVehiclesTypesFactory } from '@/modules/vehicles-types/infrastructure/factories/get-vehicles-types.factory'

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
