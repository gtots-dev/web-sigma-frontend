import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { PatchLaneStatusFactory } from '@/modules/lanes/infrastructure/factories/patch-lane-status.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId, contractId, processingUnitId, laneId }, req) => {
    const featureEnableAndDisabled = await req?.json()
    const patchLaneStatus = PatchLaneStatusFactory.create({
      operationId,
      contractId,
      processingUnitId,
      laneId
    })
    patchLaneStatus.execute(featureEnableAndDisabled)
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.OK
    }
  }
)
