import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PatchRestrictionFactory } from '@/modules/restrictions/infrastructure/factories/patch-restriction.factory'

const routerApi = RouterApiFactory.create()

export const PATCH = routerApi.POST<UrlParams>(
  async ({ operationId, contractId, restrictionId }, req) => {
    const restriction = await req?.json()
    const patchRestriction = PatchRestrictionFactory.create({
      operationId,
      contractId,
      restrictionId
    })
    return await patchRestriction.execute(restriction)
  }
)
