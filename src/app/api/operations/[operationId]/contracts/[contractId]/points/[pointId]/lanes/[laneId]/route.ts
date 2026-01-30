import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { DeletePointLaneFactory } from '@/modules/points/infrastructure/factories/delete-point-lane.factory'

const routerApi = RouterApiFactory.create()

export const DELETE = routerApi.DELETE<UrlParams>(
  async ({ operationId, contractId, pointId, laneId }) => {
    const deletePointLane = DeletePointLaneFactory.create({
      operationId,
      contractId,
      pointId,
      laneId
    })
    return await deletePointLane.execute()
  }
)
