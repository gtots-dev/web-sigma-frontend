import { auth } from '@/auth'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { loadAuthContext } from './load-auth.context'

export interface GetOperationAuthContextOutput {
  operationId: string
  isAdmin: boolean
  userPermissions: Set<PermissionEnum>
  hasPermission: (permission: PermissionEnum) => boolean
}

export async function getOperationAuthContext(
  rawOperationId: string
): Promise<GetOperationAuthContextOutput> {
  const session = await auth()
  const JWT = session?.token
  const isAdmin = session?.user?.isAdmin ?? false

  const { userPermissions } = JWT
    ? await loadAuthContext(JWT, rawOperationId)
    : { userPermissions: new Set<PermissionEnum>() }

  const hasPermission = (permission: PermissionEnum): boolean => {
    return isAdmin || userPermissions.has(permission)
  }

  return {
    operationId: rawOperationId,
    isAdmin,
    userPermissions,
    hasPermission
  }
}
