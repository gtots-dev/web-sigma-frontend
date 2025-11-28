import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { PatchPointStatusFactory } from '@/modules/points/infrastructure/factories/patch-point-status.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId, contractId, pointId }, req) => {
    const pointEnableAndDisabled = await req?.json()
    const patchPointStatus = PatchPointStatusFactory.create({
      operationId,
      contractId,
      pointId
    })
    await patchPointStatus.execute(pointEnableAndDisabled)
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.OK
    }
  }
)
