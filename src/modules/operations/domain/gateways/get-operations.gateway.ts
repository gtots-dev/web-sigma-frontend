import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { OperationEntity } from '../entities/operation.entity'

export interface GetOperationsGateway {
  execute(): Promise<HttpResponseInterface<OperationEntity[]>>
}
