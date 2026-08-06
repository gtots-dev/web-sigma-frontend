import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetViolationsFactory } from '@/modules/violations/infrastructure/factories/get-violations.factory'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.POST<UrlParams>(
  async ({ operationId, contractId }) => {
    const getViolations = GetViolationsFactory.create({
      operationId,
      contractId
    })
    return await getViolations.execute()
  }
)
