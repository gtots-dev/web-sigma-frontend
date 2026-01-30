import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { DeleteGroupSubgroupFactory } from '@/modules/groups/infrastructure/factories/delete-group-subgroup.factory'

const routerApi = RouterApiFactory.create()

export const DELETE = routerApi.DELETE<UrlParams>(
  async ({ operationId, contractId, groupId, subgroupId }) => {
    const deleteGroupSubgroup = DeleteGroupSubgroupFactory.create({
      operationId,
      contractId,
      groupId,
      subgroupId
    })
    return await deleteGroupSubgroup.execute()
  }
)
