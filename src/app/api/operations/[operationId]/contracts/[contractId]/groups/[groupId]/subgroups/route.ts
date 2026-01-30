import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PostGroupSubgroupFactory } from '@/modules/groups/infrastructure/factories/post-group-subgroup.factory'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, contractId, groupId, subgroupId }, req) => {
    const groupSubgroup = await req?.json()
    const postGroupSubgroup = PostGroupSubgroupFactory.create({
      operationId,
      contractId,
      groupId,
      subgroupId
    })
    return await postGroupSubgroup.execute(groupSubgroup)
  }
)
