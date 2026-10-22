import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { DeleteStatusProcessingUnitIgnoreFactory } from '@/modules/status-processing-units/infrastructure/factories/delete-status-processing-unit-ignore.factory'

const routerApi = RouterApiFactory.create()

export const DELETE = routerApi.DELETE<UrlParams>(
  async ({ operationId, contractId, upId, ignoreId }) => {
    const deleteIgnore = DeleteStatusProcessingUnitIgnoreFactory.create({
      operationId,
      contractId,
      upId,
      ignoreId
    })
    return await deleteIgnore.execute()
  }
)
