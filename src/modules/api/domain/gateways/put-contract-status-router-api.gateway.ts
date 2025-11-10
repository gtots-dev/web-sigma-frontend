import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export interface PutContractStatusRouterApiGateway {
  execute(contract: ContractEntity): Promise<void>
}
