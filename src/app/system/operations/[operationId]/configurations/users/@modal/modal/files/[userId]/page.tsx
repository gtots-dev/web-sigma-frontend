import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { UserModals } from '@/modules/users/presentation/components/user-modals'

interface PostUserFilesModalPageProps {
  params: Promise<{
    operationId: string
    userId: string
  }>
}

export default async function PostUserFilesModalPage({
  params
}: PostUserFilesModalPageProps) {
  const { operationId, userId } = await params
  const parsedId = Number(userId)

  if (!Number.isInteger(parsedId) || parsedId <= 0) return null

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.USERS_EDIT}
      unauthorizedMessage={MESSAGES_USERS['5.39']}
    >
      <UserModals.PostFiles
        title={MESSAGES_USERS['5.37']}
        description={MESSAGES_USERS['5.38']}
        userId={parsedId}
      />
    </ModalPermissionGuard>
  )
}
