import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { ContractEntity } from '../entities/contract.entity'

export interface GetContractsServiceInterface {
  execute(token: TokenEntities): Promise<ContractEntity[]>
}
