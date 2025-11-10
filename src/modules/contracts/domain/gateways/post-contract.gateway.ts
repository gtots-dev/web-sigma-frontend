import type { ContractEntity } from '../entities/contract.entity'

export interface PostContractGateway {
  execute(contract: ContractEntity): Promise<void>
}
