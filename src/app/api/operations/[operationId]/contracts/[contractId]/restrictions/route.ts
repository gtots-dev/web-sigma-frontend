import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetRestrictionsFactory } from '@/modules/restrictions/infrastructure/factories/get-restrictions.factory'
import type { RestrictionEntity } from '@/modules/restrictions/domain/entities/restriction.entity'
import { PostRestrictionFactory } from '@/modules/restrictions/infrastructure/factories/post-restriction.factory'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, contractId }, req) => {
    const restriction: RestrictionEntity = await req?.json()
    const postRestriction = PostRestrictionFactory.create({
      operationId,
      contractId
    })
    return await postRestriction.execute(restriction)
  }
)

export const GET = routerApi.GET<UrlParams, RestrictionEntity[]>(
  async ({ operationId, contractId }) => {
    const getRestrictions = GetRestrictionsFactory.create({
      operationId,
      contractId
    })
    return await getRestrictions.execute()
  }
)
