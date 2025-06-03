import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export interface PostContractRouterApiServiceInterface {
  execute(contract: ContractEntity): Promise<void>
}
