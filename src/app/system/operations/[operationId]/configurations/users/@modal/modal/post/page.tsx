import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { UserModals } from '@/modules/users/presentation/components/user-modals'

interface PostUserModalPageProps {
  params: Promise<{
    operationId: string
  }>
}

export default async function PostUserModalPage({
  params
}: PostUserModalPageProps) {
  const { operationId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.USERS_EDIT}
      unauthorizedMessage={MESSAGES_USERS['5.39']}
    >
      <UserModals.Post
        title={MESSAGES_USERS['5.4']}
        description={MESSAGES_USERS['5.5']}
      />
    </ModalPermissionGuard>
  )
}
