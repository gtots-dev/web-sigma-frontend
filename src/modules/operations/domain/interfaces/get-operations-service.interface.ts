import type { OperationInterface } from './operation.interface'

export interface GetOperationsServiceInterface {
  execute(params?: number[]): Promise<OperationInterface[]>
}
