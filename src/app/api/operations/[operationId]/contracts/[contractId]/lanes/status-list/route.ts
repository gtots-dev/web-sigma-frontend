import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { LaneStatusInterface } from '@/modules/lanes/domain/interfaces/lane-status.interface'
import { GetLanesStatusListFactory } from '@/modules/lanes/infrastructure/factories/get-lanes-status-list.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, LaneStatusInterface[]>(
  async ({ operationId, contractId }) => {
    const getStatusList = GetLanesStatusListFactory.create({
      operationId,
      contractId
    })
    return await getStatusList.execute()
  }
)
