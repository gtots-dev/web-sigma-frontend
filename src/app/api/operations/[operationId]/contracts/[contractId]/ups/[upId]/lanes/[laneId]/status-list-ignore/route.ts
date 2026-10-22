import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetStatusLaneIgnoreFactory } from '@/modules/status-lanes/infrastructure/factories/get-status-lane-ignore.factory'
import { PostStatusLaneIgnoreFactory } from '@/modules/status-lanes/infrastructure/factories/post-status-lane-ignore.factory'
import type {
  PostStatusLaneIgnoreInterface,
  StatusLaneIgnoreInterface
} from '@/modules/status-lanes/domain/interfaces/status-lane-ignore.interface'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, StatusLaneIgnoreInterface[]>(
  async ({ operationId, contractId, upId, laneId }) => {
    const getIgnores = GetStatusLaneIgnoreFactory.create({
      operationId,
      contractId,
      upId,
      laneId
    })
    return await getIgnores.execute()
  }
)

export const POST = routerApi.POST<UrlParams, StatusLaneIgnoreInterface>(
  async ({ operationId, contractId, upId, laneId }, req) => {
    const body: PostStatusLaneIgnoreInterface = await req?.json()
    const postIgnore = PostStatusLaneIgnoreFactory.create({
      operationId,
      contractId,
      upId,
      laneId
    })
    return await postIgnore.execute(body)
  }
)
