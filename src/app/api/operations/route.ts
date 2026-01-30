import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'
import { GetOperationsFactory } from '@/modules/operations/infrastructure/factories/get-operations.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, OperationEntity[]>(async () => {
  const getOperations = GetOperationsFactory.create()
  return await getOperations.execute()
})
