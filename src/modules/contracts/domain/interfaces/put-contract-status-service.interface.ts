import type { ContractEntity } from '../entities/contract.entity'

export interface PutContractStatusServiceInterface {
  execute(contract: ContractEntity): Promise<void>
}
