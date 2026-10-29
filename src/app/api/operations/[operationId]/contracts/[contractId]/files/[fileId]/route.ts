import { GetContractFileFactory } from '@/modules/contracts/infrastructure/factories/get-contract-file.factory'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UrlFileInterface } from '@/modules/contracts/domain/interfaces/url-file.interface'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, UrlFileInterface>(
  async ({ operationId, contractId, fileId }) => {
    const getContractFileFactory = GetContractFileFactory.create({
      operationId,
      contractId,
      fileId
    })
    return await getContractFileFactory.execute()
  }
)
