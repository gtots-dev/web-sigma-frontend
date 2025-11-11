import type { ContractEntity } from '../entities/contract.entity'

export interface PutContractStatusGateway {
  execute(contract: ContractEntity): Promise<void>
}
