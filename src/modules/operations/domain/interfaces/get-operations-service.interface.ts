import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { OperationInterface } from './operation.interface'

export interface GetOperationsServiceInterface {
  execute(
    token: TokenEntities,
    params?: number[]
  ): Promise<OperationInterface[]>
}
