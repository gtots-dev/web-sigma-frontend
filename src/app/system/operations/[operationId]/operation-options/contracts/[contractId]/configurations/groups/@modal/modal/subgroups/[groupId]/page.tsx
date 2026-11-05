import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_GROUP } from '@/modules/shared/presentation/messages/groups'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { GroupModal } from '@/modules/groups/presentation/components/group-modals'

interface PostGroupSubgroupModalPageProps {
  params: Promise<{
    operationId: string
    contractId: string
    groupId: string
  }>
}

export default async function PostGroupSubgroupModalPage({
  params
}: PostGroupSubgroupModalPageProps) {
  const { operationId, groupId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.GROUPS_EDIT}
      unauthorizedMessage={MESSAGES_GROUP['18.21']}
    >
      {({ hasPermission }) => (
        <GroupModal.PostSubgroup
          title={MESSAGES_GROUP['18.19']}
          description={MESSAGES_GROUP['18.20']}
          groupId={Number(groupId)}
          isPermittedGroups={hasPermission(PermissionEnum.GROUPS_VIEW)}
        />
      )}
    </ModalPermissionGuard>
  )
}
