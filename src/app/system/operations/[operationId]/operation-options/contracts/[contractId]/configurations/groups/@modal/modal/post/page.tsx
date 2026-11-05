import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_GROUP } from '@/modules/shared/presentation/messages/groups'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { GroupModal } from '@/modules/groups/presentation/components/group-modals'

interface PostGroupModalPageProps {
  params: Promise<{ operationId: string }>
}

export default async function PostGroupModalPage({
  params
}: PostGroupModalPageProps) {
  const { operationId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.GROUPS_EDIT}
      unauthorizedMessage={MESSAGES_GROUP['18.21']}
    >
      <GroupModal.Post
        title={MESSAGES_GROUP['18.4']}
        description={MESSAGES_GROUP['18.5']}
      />
    </ModalPermissionGuard>
  )
}
