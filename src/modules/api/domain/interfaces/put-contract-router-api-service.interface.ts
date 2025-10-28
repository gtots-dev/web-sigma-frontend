import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export interface PatchContractRouterApiServiceInterface {
  execute(contract: ContractEntity): Promise<void>
}
