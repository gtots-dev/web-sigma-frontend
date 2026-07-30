import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PostTrafficFlowFactory } from '@/modules/traffic-flow/infrastructure/factories/post-traffic-flow-service.factory'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, contractId }, req) => {
    const filter = await req.json()
    const postTrafficFlow = PostTrafficFlowFactory.create({
      operationId,
      contractId
    })
    return await postTrafficFlow.execute(filter)
  }
)
