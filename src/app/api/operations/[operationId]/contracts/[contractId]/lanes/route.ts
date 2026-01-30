import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetContractLanesFactory } from '@/modules/lanes/infrastructure/factories/get-contract-lanes.factory'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams>(
  async ({ operationId, contractId }) => {
    const getContractLanes = GetContractLanesFactory.create({
      operationId,
      contractId
    })
    return await getContractLanes.execute()
  }
)
