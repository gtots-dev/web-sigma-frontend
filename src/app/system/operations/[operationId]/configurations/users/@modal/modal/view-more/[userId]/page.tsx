import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { UserModals } from '@/modules/users/presentation/components/user-modals'

interface ViewMoreUserModalPageProps {
  params: Promise<{
    operationId: string
    userId: string
  }>
}

export default async function ViewMoreUserModalPage({
  params
}: ViewMoreUserModalPageProps) {
  const { operationId, userId } = await params
  const parsedId = Number(userId)

  if (!Number.isInteger(parsedId) || parsedId <= 0) return null

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.USERS_VIEW}
      unauthorizedMessage={MESSAGES_USERS['5.39']}
    >
      <UserModals.ViewMore
        title={MESSAGES_USERS['5.27']}
        description={MESSAGES_USERS['5.28']}
        userId={parsedId}
      />
    </ModalPermissionGuard>
  )
}
