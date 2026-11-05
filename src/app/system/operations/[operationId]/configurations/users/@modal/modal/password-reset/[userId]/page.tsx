import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_PASSWORD_RESET } from '@/modules/shared/presentation/messages/password-reset'
import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { UserModals } from '@/modules/users/presentation/components/user-modals'

interface PutUserPasswordResetModalPageProps {
  params: Promise<{
    operationId: string
    userId: string
  }>
}

export default async function PutUserPasswordResetModalPage({
  params
}: PutUserPasswordResetModalPageProps) {
  const { operationId, userId } = await params
  const parsedId = Number(userId)

  if (!Number.isInteger(parsedId) || parsedId <= 0) return null

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.USERS_PASSWORD_RESET}
      unauthorizedMessage={MESSAGES_USERS['5.39']}
    >
      <UserModals.PutPasswordReset
        title={MESSAGES_PASSWORD_RESET['2.14']}
        description={MESSAGES_PASSWORD_RESET['2.15']}
        userId={parsedId}
      />
    </ModalPermissionGuard>
  )
}
