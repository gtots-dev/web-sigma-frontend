import type { OperationIdInterface } from '@/modules/operations/domain/interfaces/operation-id.interface'
import type { ContractInterface } from './contract.interface'

export interface ContractWithOperationId
  extends ContractInterface,
    OperationIdInterface {
  [key: string]: unknown
}
