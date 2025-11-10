import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type { LaneEntity } from '@/modules/lanes/domain/entities/lane.entity'
import { GetLanesFactory } from '@/modules/lanes/infrastructure/factories/get-lanes.factory'
import { PatchLaneFactory } from '@/modules/lanes/infrastructure/factories/patch-lane.factory'
import { PostLaneFactory } from '@/modules/lanes/infrastructure/factories/post-lane.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, contractId, processingUnitId }, req) => {
    const lane = await req?.json()
    const postLane = PostLaneFactory.create({
      operationId,
      contractId,
      processingUnitId
    })
    await postLane.execute(lane)
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.OK
    }
  }
)

export const GET = routerApi.GET<UrlParams, LaneEntity[]>(
  async ({ operationId, contractId, processingUnitId }) => {
    const getLanes = GetLanesFactory.create({
      operationId,
      contractId,
      processingUnitId
    })
    const response = await getLanes.execute()
    return { data: response, status: HttpStatusCodeEnum.OK }
  }
)

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId, contractId, processingUnitId }, req) => {
    const lane = await req?.json()
    const pathLane = PatchLaneFactory.create({
      operationId,
      contractId,
      processingUnitId
    })
    await pathLane.execute(lane)
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.OK
    }
  }
)
