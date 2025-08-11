import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { OperationEntity } from '../entities/operation.entity'

export interface GetOperationsServiceInterface {
  execute(token: TokenEntities): Promise<OperationEntity[]>
}
