import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { PatchProcessingUnitStatusFactory } from '@/modules/processing-units/infrastructure/factories/patch-processing-unit-status.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId, contractId, processingUnitId }, req) => {
    const processingUnitEnableAndDisabled = await req?.json()
    const patchProcessingUnit = PatchProcessingUnitStatusFactory.create({
      operationId,
      contractId,
      processingUnitId
    })
    await patchProcessingUnit.execute(processingUnitEnableAndDisabled)
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.OK
    }
  }
)
