import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_GROUP } from '@/modules/shared/presentation/messages/groups'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { GroupModal } from '@/modules/groups/presentation/components/group-modals'

interface PostGroupPointModalPageProps {
  params: Promise<{
    operationId: string
    contractId: string
    groupId: string
  }>
}

export default async function PostGroupPointModalPage({
  params
}: PostGroupPointModalPageProps) {
  const { operationId, groupId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.GROUPS_EDIT}
      unauthorizedMessage={MESSAGES_GROUP['18.21']}
    >
      {({ hasPermission }) => (
        <GroupModal.PostPoint
          title={MESSAGES_GROUP['18.17']}
          description={MESSAGES_GROUP['18.18']}
          groupId={Number(groupId)}
          isPermittedPoints={hasPermission(PermissionEnum.POINTS_VIEW)}
        />
      )}
    </ModalPermissionGuard>
  )
}
