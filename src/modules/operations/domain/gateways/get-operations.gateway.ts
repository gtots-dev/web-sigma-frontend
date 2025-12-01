import type { OperationEntity } from '../entities/operation.entity'

export interface GetOperationsGateway {
  execute(): Promise<OperationEntity[]>
}
