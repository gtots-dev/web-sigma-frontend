import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { DeleteGroupLaneFactory } from '@/modules/groups/infrastructure/factories/delete-group-lane.factory'

const routerApi = RouterApiFactory.create()

export const DELETE = routerApi.DELETE<UrlParams>(
  async ({ operationId, contractId, groupId, laneId }) => {
    const deleteGroupLane = DeleteGroupLaneFactory.create({
      operationId,
      contractId,
      groupId,
      laneId
    })
    await deleteGroupLane.execute()
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.NO_CONTENT
    }
  }
)
