import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_PERMISSIONS } from '@/modules/shared/presentation/messages/permissions'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { PermissionProfileModal } from '@/modules/permissions/presentation/components/permission-profile-modals'

interface PatchPermissionProfileModalPageProps {
  params: Promise<{
    operationId: string
    permissionProfileId: string
  }>
}

export default async function PatchPermissionProfileModalPage({
  params
}: PatchPermissionProfileModalPageProps) {
  const { operationId, permissionProfileId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.PERMISSIONS_EDIT}
      unauthorizedMessage={MESSAGES_PERMISSIONS['6.16']}
    >
      <PermissionProfileModal.Patch
        title={MESSAGES_PERMISSIONS['6.10']}
        description={MESSAGES_PERMISSIONS['6.11']}
        permissionProfileId={Number(permissionProfileId)}
      />
    </ModalPermissionGuard>
  )
}
