import { GetOperationsFactory } from '../../infrastructure/factories/get-operations.factory'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { OperationEntity } from '../../domain/entities/operation.entity'

export async function getOperations(
  JWT: TokenEntities
): Promise<OperationEntity[]> {
  const getOperations = GetOperationsFactory.create()
  return await getOperations.execute(JWT)
}
