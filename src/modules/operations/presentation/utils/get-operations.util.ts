import { auth } from '@/auth'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'
import { GetOperationsFactory } from '../../infrastructure/factories/get-operations.factory'
import type { OperationEntities } from '../../domain/entities/operation.entity'

export async function getOperations(): Promise<OperationEntities[]> {
  const { token } = await auth()
  const jwtDecode = JwtTokenDecodeFactory.create()
  const { operation_ids } = jwtDecode.decode(token.access_token)
  const getOperations = GetOperationsFactory.create()
  return await getOperations.execute(token, operation_ids)
}
