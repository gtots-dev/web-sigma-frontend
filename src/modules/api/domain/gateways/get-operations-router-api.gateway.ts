import type { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export interface GetOperationsRouterApiGateway {
  execute(): Promise<HttpResponseInterface<OperationEntity[]>>
}
