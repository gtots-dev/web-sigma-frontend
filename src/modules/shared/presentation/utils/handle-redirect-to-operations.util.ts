import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'
import type { HttpResponseInterface } from '../../domain/interfaces/http-response.interface'

export interface handleRedirectToOperationsDependencies {
  getAuthToken(): Promise<TokenEntities | null>
  decodeToken(token: TokenEntities): { operation_ids: number[] }
  getOperations(): Promise<HttpResponseInterface<OperationEntity[]>>
  createOperation(data: OperationEntity): OperationEntity
  saveOperationToCookies(operation: OperationEntity): void
  getRedirectUrl(single: boolean, id?: string): string
}

export async function handleRedirectToOperationsUtil(
  pathname: string,
  systemPath: string,
  deps: handleRedirectToOperationsDependencies
): Promise<string | null> {
  if (pathname !== systemPath) return null

  const token = await deps.getAuthToken()
  if (!token?.access_token) return deps.getRedirectUrl(false)

  const { operation_ids: operationIds } = deps.decodeToken(token)
  if (!operationIds?.length) return null

  const { data: operations } = await deps.getOperations()
  const hasSingleOperation = operationIds.length === 1

  let operationId: string | undefined = undefined
  if (hasSingleOperation && operations.length) {
    const operation = deps.createOperation(operations[0])
    operationId = operation.id
    deps.saveOperationToCookies(operation)
  }

  return deps.getRedirectUrl(hasSingleOperation, operationId)
}
