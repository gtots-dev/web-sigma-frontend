import { auth } from '@/auth'
import { GetOperationsFactory } from '../../infrastructure/factories/get-operations.factory'
import type { OperationEntity } from '../../domain/entities/operation.entity'

export async function getOperations(): Promise<OperationEntity[]> {
  const { token } = await auth()
  const getOperations = GetOperationsFactory.create()
  return await getOperations.execute(token)
}
