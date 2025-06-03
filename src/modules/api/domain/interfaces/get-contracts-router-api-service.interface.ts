import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'

export interface GetContractsRouterApiServiceInterface {
  execute(): Promise<ContractEntity[]>
}
