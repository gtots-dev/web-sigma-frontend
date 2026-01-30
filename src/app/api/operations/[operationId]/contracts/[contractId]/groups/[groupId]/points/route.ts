import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PostGroupPointFactory } from '@/modules/groups/infrastructure/factories/post-group-point.factory'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, contractId, groupId, pointId }, req) => {
    const groupPoint = await req?.json()
    const postGroupPoint = PostGroupPointFactory.create({
      operationId,
      contractId,
      groupId,
      pointId
    })
    return await postGroupPoint.execute(groupPoint)
  }
)
