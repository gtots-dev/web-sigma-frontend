import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PostPointLaneFactory } from '@/modules/points/infrastructure/factories/post-point-lane.factory'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, contractId, pointId, laneId }, req) => {
    const pointLane = await req?.json()
    const postPointLane = PostPointLaneFactory.create({
      operationId,
      contractId,
      pointId,
      laneId
    })
    return await postPointLane.execute(pointLane)
  }
)
