import type { ReactNode } from 'react'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import {
  getOperationAuthContext,
  type GetOperationAuthContextOutput
} from '@/modules/system/presentation/contexts/get-operation-auth.context'
import { UnauthorizedModalToast } from '@/modules/system/presentation/components/unauthorized-modal-toast/unauthorized-modal-toast.component'

interface ModalPermissionGuardProps {
  operationId: string
  permission: PermissionEnum
  unauthorizedTitle?: string
  unauthorizedMessage?: string
  children:
    | ReactNode
    | ((authContext: GetOperationAuthContextOutput) => ReactNode)
}

export async function ModalPermissionGuard({
  operationId,
  permission,
  unauthorizedTitle,
  unauthorizedMessage,
  children
}: ModalPermissionGuardProps) {
  const authContext = await getOperationAuthContext(operationId)

  if (!authContext.hasPermission(permission)) {
    return (
      <UnauthorizedModalToast
        title={unauthorizedTitle}
        message={unauthorizedMessage}
      />
    )
  }

  return (
    <>{typeof children === 'function' ? children(authContext) : children}</>
  )
}
