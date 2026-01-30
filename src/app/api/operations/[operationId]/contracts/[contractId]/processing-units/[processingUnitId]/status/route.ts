import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
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
    return await patchProcessingUnit.execute(processingUnitEnableAndDisabled)
  }
)
