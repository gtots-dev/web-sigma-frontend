import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PatchViolationFactory } from '@/modules/violations/infrastructure/factories/patch-violation.factory'

const routerApi = RouterApiFactory.create()

export const PATCH = routerApi.POST<UrlParams>(
  async ({ operationId, contractId, violationId }, req) => {
    const violation = await req?.json()
    const patchViolation = PatchViolationFactory.create({
      operationId,
      contractId,
      violationId
    })
    return await patchViolation.execute(violation)
  }
)
