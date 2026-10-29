import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { ContractFileInterface } from '@/modules/contracts/domain/interfaces/contract-file.interface'
import { GetContractFilesFactory } from '@/modules/contracts/infrastructure/factories/get-contract-files.factory'
import { PostContractFilesFactory } from '@/modules/contracts/infrastructure/factories/post-contract-files.factory'
import { NextFormDataDecoder } from '@/modules/shared/infrastructure/converters/next-form-data-decoder'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, ContractFileInterface[]>(
  async ({ operationId, contractId }) => {
    const getContractFilesFactory = GetContractFilesFactory.create({
      operationId,
      contractId
    })
    return await getContractFilesFactory.execute()
  }
)

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, contractId }, req) => {
    const incomingFormData = await req?.formData()
    const decodedFormData = incomingFormData
      ? await NextFormDataDecoder.decode(incomingFormData, 'file')
      : undefined

    const postContractFilesFactory = PostContractFilesFactory.create({
      operationId,
      contractId
    })

    return await postContractFilesFactory.execute(decodedFormData)
  }
)
