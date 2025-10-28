import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'

interface LoadAuthContextProps {
  userPermissions: Set<PermissionEnum>
}

export async function loadAuthContext(
  JWT: TokenEntities,
  rawOperationId: string
): Promise<LoadAuthContextProps> {
  const jwtFactory = JwtTokenDecodeFactory.create()
  const { permissions } = jwtFactory.decode(JWT.access_token)

  const rawPermissions = permissions[String(rawOperationId)] ?? []
  const userPermissions = new Set(rawPermissions as PermissionEnum[])

  return {
    userPermissions
  }
}
