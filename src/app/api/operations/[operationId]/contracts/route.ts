import { GetContractsFactory } from '@/modules/contracts/infrastructure/factories/get-contracts.factory'
import { PostContractFactory } from '@/modules/contracts/infrastructure/factories/post-contract.factory'
import { PatchContractFactory } from '@/modules/contracts/infrastructure/factories/patch-contract.factory'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, ContractEntity[]>(
  async ({ operationId }) => {
    const getContracts = GetContractsFactory.create({ operationId })
    return await getContracts.execute()
  }
)

export const POST = routerApi.POST<UrlParams>(async ({ operationId }, req) => {
  const contract = await req?.json()
  const postContract = PostContractFactory.create({ operationId })
  return await postContract.execute(contract)
})

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId }, req) => {
    const contract = await req?.json()
    const patchContract = PatchContractFactory.create({ operationId })
    return await patchContract.execute(contract)
  }
)
