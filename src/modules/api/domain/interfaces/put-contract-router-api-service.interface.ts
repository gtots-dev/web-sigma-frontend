import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export interface PutContractRouterApiServiceInterface {
  execute(contract: ContractEntity): Promise<void>
}
