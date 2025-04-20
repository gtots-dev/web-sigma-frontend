import type { OperationInterface } from './operation.interface'

export interface GetSelectionOperationServiceInterface {
  execute(): Promise<OperationInterface>
}
