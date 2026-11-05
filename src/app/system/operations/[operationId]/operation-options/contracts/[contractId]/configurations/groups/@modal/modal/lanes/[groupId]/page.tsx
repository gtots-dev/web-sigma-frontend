import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_GROUP } from '@/modules/shared/presentation/messages/groups'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { GroupModal } from '@/modules/groups/presentation/components/group-modals'

interface PostGroupLaneModalPageProps {
  params: Promise<{
    operationId: string
    contractId: string
    groupId: string
  }>
}

export default async function PostGroupLaneModalPage({
  params
}: PostGroupLaneModalPageProps) {
  const { operationId, groupId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.GROUPS_EDIT}
      unauthorizedMessage={MESSAGES_GROUP['18.21']}
    >
      {({ hasPermission }) => (
        <GroupModal.PostLane
          title={MESSAGES_GROUP['18.11']}
          description={MESSAGES_GROUP['18.12']}
          groupId={Number(groupId)}
          isPermittedLane={hasPermission(PermissionEnum.LANES_VIEW)}
        />
      )}
    </ModalPermissionGuard>
  )
}
