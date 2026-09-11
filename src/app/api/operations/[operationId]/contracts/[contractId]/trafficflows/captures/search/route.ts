import { PostInfractionsFactory } from '@/modules/infractions/infrastructure/factories/post-infractions.factory'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { Infraction } from '@/modules/infractions/domain/interfaces/infraction.interface'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams, Infraction[]>(
  async ({ operationId, contractId }, req) => {
    const body = await req.json().catch(() => ({}))

    const postInfractions = PostInfractionsFactory.create({
      operationId,
      contractId
    })
    return await postInfractions.execute(body)
  }
)
