import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetProcessingUnitStatusListFactory } from '@/modules/processing-units/infrastructure/factories/get-processing-unit-status-list.factory'
import type { StatusListItem } from '@/modules/processing-units/domain/gateways/get-processing-unit-status-list.gateway'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, StatusListItem[]>(
  async ({ operationId, contractId }) => {
    const getStatusList = GetProcessingUnitStatusListFactory.create({
      operationId,
      contractId
    })
    return await getStatusList.execute()
  }
)
