import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { GetViolationColorsFactory } from '@/modules/violations/infrastructure/factories/get-violation-colors.factory'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.POST<UrlParams>(
  async ({ operationId, contractId }) => {
    const getViolationColors = GetViolationColorsFactory.create({
      operationId,
      contractId
    })
    return await getViolationColors.execute()
  }
)
