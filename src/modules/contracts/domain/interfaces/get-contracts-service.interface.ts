import type { ContractEntity } from '../entities/contract.entity'

export interface GetContractsServiceInterface {
  execute(): Promise<ContractEntity[]>
}
