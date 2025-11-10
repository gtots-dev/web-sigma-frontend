import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export interface GetContractsRouterApiGateway {
  execute(): Promise<ContractEntity[]>
}
