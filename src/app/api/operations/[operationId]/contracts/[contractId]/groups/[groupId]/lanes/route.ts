import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PostGroupLaneFactory } from '@/modules/groups/infrastructure/factories/post-group-lane.factory'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, contractId, groupId, laneId }, req) => {
    const groupLane = await req?.json()
    const postGroupLane = PostGroupLaneFactory.create({
      operationId,
      contractId,
      groupId,
      laneId
    })
    return await postGroupLane.execute(groupLane)
  }
)
