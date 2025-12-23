import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export interface PostContractRouterApiGateway {
  execute(contract: ContractEntity): Promise<void>
}
