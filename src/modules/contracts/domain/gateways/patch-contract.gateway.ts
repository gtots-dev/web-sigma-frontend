import type { ContractEntity } from '../entities/contract.entity'

export interface PatchContractGateway {
  execute(contract: ContractEntity): Promise<void>
}
