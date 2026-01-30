import { GetPointsFactory } from '@/modules/points/infrastructure/factories/get-points.factory'
import { PostPointFactory } from '@/modules/points/infrastructure/factories/post-point.factory'
import { PatchPointFactory } from '@/modules/points/infrastructure/factories/patch-point.factory'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PointWithGroupInterface } from '@/modules/points/domain/interfaces/point-with-group.interface'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, PointWithGroupInterface[]>(
  async ({ operationId, contractId }) => {
    const getPoints = GetPointsFactory.create({ operationId, contractId })
    return await getPoints.execute()
  }
)

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, contractId }, req) => {
    const point = await req?.json()
    const postPoint = PostPointFactory.create({ operationId, contractId })
    return await postPoint.execute(point)
  }
)

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId, contractId }, req) => {
    const point = await req?.json()
    const patchPoint = PatchPointFactory.create({ operationId, contractId })
    return await patchPoint.execute(point)
  }
)
