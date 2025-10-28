import { GetContractsFactory } from '@/modules/contracts/infrastructure/factories/get-contracts.factory'
import { PostContractFactory } from '@/modules/contracts/infrastructure/factories/post-contract.factory'
import { PatchContractFactory } from '@/modules/contracts/infrastructure/factories/patch-contract.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, ContractEntity[]>(
  async ({ operationId }) => {
    const getContracts = GetContractsFactory.create({ operationId })
    const response = await getContracts.execute()
    return { data: response, status: HttpStatusCodeEnum.OK }
  }
)

export const POST = routerApi.POST<UrlParams>(async ({ operationId }, req) => {
  const contract = await req?.json()
  const postContract = PostContractFactory.create({ operationId })
  await postContract.execute(contract)
  return {
    data: { success: true },
    status: HttpStatusCodeEnum.OK
  }
})

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId }, req) => {
    const contract = await req?.json()
    const patchContract = PatchContractFactory.create({ operationId })
    await patchContract.execute(contract)
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.OK
    }
  }
)
