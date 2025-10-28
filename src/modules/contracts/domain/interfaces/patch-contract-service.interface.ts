import type { ContractEntity } from '../entities/contract.entity'

export interface PatchContractServiceInterface {
  execute(contract: ContractEntity): Promise<void>
}
