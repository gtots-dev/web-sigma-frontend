import type { ContractEntity } from '../entities/contract.entity'

export interface GetContractsGateway {
  execute(): Promise<ContractEntity[]>
}
