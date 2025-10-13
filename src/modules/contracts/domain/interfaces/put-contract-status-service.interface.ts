import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { ContractEntity } from '../entities/contract.entity'

export interface PutContractStatusServiceInterface {
  execute(token: TokenEntities, contract: ContractEntity): Promise<void>
}
