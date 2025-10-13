import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export interface PutContractStatusRouterApiServiceInterface {
  execute(contract: ContractEntity): Promise<void>
}
