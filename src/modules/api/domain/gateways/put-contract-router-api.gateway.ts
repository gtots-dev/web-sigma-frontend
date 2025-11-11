import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export interface PatchContractRouterApiGateway {
  execute(contract: ContractEntity): Promise<void>
}
