import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'
import { GetProcessingUnitsFactory } from '@/modules/processing-units/infrastructure/factories/get-processing-unit.factory'
import { PatchProcessingUnitFactory } from '@/modules/processing-units/infrastructure/factories/patch-processing-unit.factory'
import { PostProcessingUnitFactory } from '@/modules/processing-units/infrastructure/factories/post-processing-unit.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, contractId }, req) => {
    const processingUnit = await req?.json()
    const postProcessingUnit = PostProcessingUnitFactory.create({
      operationId,
      contractId
    })
    return await postProcessingUnit.execute(processingUnit)
  }
)

export const GET = routerApi.GET<UrlParams, ProcessingUnitEntity[]>(
  async ({ operationId, contractId }) => {
    const getProcessingUnits = GetProcessingUnitsFactory.create({
      operationId,
      contractId
    })
    return await getProcessingUnits.execute()
  }
)

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId, contractId }, req) => {
    const processingUnit = await req?.json()
    const patchProcessingUnit = PatchProcessingUnitFactory.create({
      operationId,
      contractId
    })
    return await patchProcessingUnit.execute(processingUnit)
  }
)
