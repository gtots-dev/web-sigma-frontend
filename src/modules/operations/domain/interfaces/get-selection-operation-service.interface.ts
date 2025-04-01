import type { OperationInterface } from './operation.interface'

export interface GetSelectionOperationServiceInterface {
  getSelectionOperation(): Promise<OperationInterface>
}
