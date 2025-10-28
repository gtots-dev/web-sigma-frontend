import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { PutContractStatusFactory } from '@/modules/contracts/infrastructure/factories/put-contract-status.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'

const routerApi = RouterApiFactory.create()

export const PUT = routerApi.PUT<UrlParams>(async ({ operationId }, req) => {
  const contract = await req?.json()
  const putContract = PutContractStatusFactory.create({ operationId })
  await putContract.execute(contract)
  return {
    data: { success: true },
    status: HttpStatusCodeEnum.OK
  }
})
