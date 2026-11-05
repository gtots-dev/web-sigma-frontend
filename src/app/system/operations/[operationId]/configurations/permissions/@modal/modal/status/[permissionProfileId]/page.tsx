import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_PERMISSIONS } from '@/modules/shared/presentation/messages/permissions'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { PermissionProfileModal } from '@/modules/permissions/presentation/components/permission-profile-modals'

interface PatchPermissionProfileStatusModalPageProps {
  params: Promise<{
    operationId: string
    permissionProfileId: string
  }>
}

export default async function PatchPermissionProfileStatusModalPage({
  params
}: PatchPermissionProfileStatusModalPageProps) {
  const { operationId, permissionProfileId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.PERMISSIONS_ENABLE_AND_DISABLE}
      unauthorizedMessage={MESSAGES_PERMISSIONS['6.16']}
    >
      <PermissionProfileModal.PatchStatus
        title={MESSAGES_PERMISSIONS['6.14']}
        description={MESSAGES_PERMISSIONS['6.15']}
        permissionProfileId={Number(permissionProfileId)}
      />
    </ModalPermissionGuard>
  )
}
