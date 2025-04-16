import type { TokenEntities } from "@/modules/authentication/domain/entities/token.entity"
import type { OperationEntities } from "@/modules/operations/domain/entities/operation.entity"

export interface handleRedirectToOperationsDependencies {
  getAuthToken(): Promise<TokenEntities | null>
  decodeToken(token: TokenEntities): { operation_ids: number[] }
  getOperations(token: TokenEntities, ids: number[]): Promise<OperationEntities[]>
  createOperation(data: OperationEntities): OperationEntities
  saveOperationToCookies(operation: OperationEntities): void
  getRedirectUrl(single: boolean): string
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

  const operations = await deps.getOperations(token, operationIds)
  const hasSingleOperation = operationIds.length === 1
  const redirectTarget = deps.getRedirectUrl(hasSingleOperation)

  if (hasSingleOperation && operations.length) {
    const operation = deps.createOperation(operations[0])
    deps.saveOperationToCookies(operation)
  }

  return redirectTarget
}
