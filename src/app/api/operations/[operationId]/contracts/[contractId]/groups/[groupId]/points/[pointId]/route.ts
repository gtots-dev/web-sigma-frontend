import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { DeleteGroupPointFactory } from '@/modules/groups/infrastructure/factories/delete-group-point.factory'

const routerApi = RouterApiFactory.create()

export const DELETE = routerApi.DELETE<UrlParams>(
  async ({ operationId, contractId, groupId, pointId }) => {
    const deleteGroupPoint = DeleteGroupPointFactory.create({
      operationId,
      contractId,
      groupId,
      pointId
    })
    return await deleteGroupPoint.execute()
  }
)
