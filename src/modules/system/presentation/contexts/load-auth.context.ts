import { auth } from '@/auth'
import { getOperations } from '@/modules/operations/presentation/utils/get-operations.util'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'

interface LoadAuthContextProps {
  operationId: number
  userPermissions: Set<PermissionEnum>
  operations: Awaited<ReturnType<typeof getOperations>>
}

export async function loadAuthContext(
  rawOperationId: string
): Promise<LoadAuthContextProps> {
  const operationId = Number(rawOperationId)
  const { token: JWT } = await auth()

  const jwtFactory = JwtTokenDecodeFactory.create()
  const { permissions } = jwtFactory.decode(JWT.access_token)

  const operations = await getOperations(JWT)
  const rawPermissions = permissions[String(operationId)] ?? []
  const userPermissions = new Set(rawPermissions as PermissionEnum[])

  return {
    operationId,
    userPermissions,
    operations
  }
}
