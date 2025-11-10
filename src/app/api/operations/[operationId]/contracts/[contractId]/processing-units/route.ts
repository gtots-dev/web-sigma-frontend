import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
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
    await postProcessingUnit.execute(processingUnit)
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.OK
    }
  }
)

export const GET = routerApi.GET<UrlParams, ProcessingUnitEntity[]>(
  async ({ operationId, contractId }) => {
    const getProcessingUnits = GetProcessingUnitsFactory.create({
      operationId,
      contractId
    })
    const response = await getProcessingUnits.execute()
    return { data: response, status: HttpStatusCodeEnum.OK }
  }
)

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId, contractId }, req) => {
    const processingUnit = await req?.json()
    const patchProcessingUnit = PatchProcessingUnitFactory.create({
      operationId,
      contractId
    })
    await patchProcessingUnit.execute(processingUnit)
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.OK
    }
  }
)
