import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_PERMISSIONS } from '@/modules/shared/presentation/messages/permissions'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { PermissionProfileModal } from '@/modules/permissions/presentation/components/permission-profile-modals'

interface PostPermissionProfileModalPageProps {
  params: Promise<{ operationId: string }>
}

export default async function PostPermissionProfileModalPage({
  params
}: PostPermissionProfileModalPageProps) {
  const { operationId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.PERMISSIONS_EDIT}
      unauthorizedMessage={MESSAGES_PERMISSIONS['6.16']}
    >
      <PermissionProfileModal.Post
        title={MESSAGES_PERMISSIONS['6.4']}
        description={MESSAGES_PERMISSIONS['6.5']}
      />
    </ModalPermissionGuard>
  )
}
