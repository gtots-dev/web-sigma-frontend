import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { DeleteStatusLaneIgnoreFactory } from '@/modules/status-lanes/infrastructure/factories/delete-status-lane-ignore.factory'

const routerApi = RouterApiFactory.create()

export const DELETE = routerApi.DELETE<UrlParams>(
  async ({ operationId, contractId, upId, laneId, ignoreId }) => {
    const deleteIgnore = DeleteStatusLaneIgnoreFactory.create({
      operationId,
      contractId,
      upId,
      laneId,
      ignoreId
    })
    return await deleteIgnore.execute()
  }
)
