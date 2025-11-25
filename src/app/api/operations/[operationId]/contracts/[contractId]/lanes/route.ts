import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
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
    const response = await getContractLanes.execute()
    return { data: response, status: HttpStatusCodeEnum.OK }
  }
)
