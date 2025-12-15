import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
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
    await deleteGroupSubgroup.execute()
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.NO_CONTENT
    }
  }
)
