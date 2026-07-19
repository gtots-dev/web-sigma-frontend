import { GetInfractionsFactory } from '@/modules/infractions/infrastructure/factories/get-infractions.factory'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { Infraction } from '@/modules/infractions/domain/interfaces/infractions-websocket.interface'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, Infraction[]>(
  async ({ operationId, contractId }) => {
    const getInfractions = GetInfractionsFactory.create({ operationId, contractId })
    return await getInfractions.execute()
  }
)
