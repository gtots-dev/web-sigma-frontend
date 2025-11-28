import { GetPointsFactory } from '@/modules/points/infrastructure/factories/get-points.factory'
import { PostPointFactory } from '@/modules/points/infrastructure/factories/post-point.factory'
import { PatchPointFactory } from '@/modules/points/infrastructure/factories/patch-point.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { PointWithGroupInterface } from '@/modules/points/domain/interfaces/point-with-group.interface'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, PointWithGroupInterface[]>(
  async ({ operationId, contractId }) => {
    const getPoints = GetPointsFactory.create({ operationId, contractId })
    const response = await getPoints.execute()
    return { data: response, status: HttpStatusCodeEnum.OK }
  }
)

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, contractId }, req) => {
    const point = await req?.json()
    const postPoint = PostPointFactory.create({ operationId, contractId })
    await postPoint.execute(point)
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.OK
    }
  }
)

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId, contractId }, req) => {
    const point = await req?.json()
    const patchPoint = PatchPointFactory.create({ operationId, contractId })
    await patchPoint.execute(point)
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.OK
    }
  }
)
