import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_GROUP } from '@/modules/shared/presentation/messages/groups'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { GroupModal } from '@/modules/groups/presentation/components/group-modals'

interface ViewMoreGroupModalPageProps {
  params: Promise<{
    operationId: string
    contractId: string
    groupId: string
  }>
}

export default async function ViewMoreGroupModalPage({
  params
}: ViewMoreGroupModalPageProps) {
  const { operationId, groupId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.GROUPS_VIEW}
      unauthorizedMessage={MESSAGES_GROUP['18.21']}
    >
      {({ hasPermission }) => (
        <GroupModal.ViewMore
          title={MESSAGES_GROUP['18.15']}
          description={MESSAGES_GROUP['18.16']}
          groupId={Number(groupId)}
          isPermittedLane={hasPermission(PermissionEnum.LANES_VIEW)}
          isPermittedPoints={hasPermission(PermissionEnum.POINTS_VIEW)}
        />
      )}
    </ModalPermissionGuard>
  )
}
