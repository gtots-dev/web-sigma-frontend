import type { OperationInterface } from './operation.interface'

export interface SetSelectionOperationServiceInterface {
  execute(operation: OperationInterface): Promise<void>
}
