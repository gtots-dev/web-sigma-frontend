import type { OperationInterface } from './operation.interface'

export interface SetSelectionOperationServiceInterface {
  setSelectionOperation(operation: OperationInterface): Promise<void>
}
