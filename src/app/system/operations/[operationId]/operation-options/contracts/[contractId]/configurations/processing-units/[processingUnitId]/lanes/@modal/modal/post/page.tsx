import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_LANE } from '@/modules/shared/presentation/messages/lanes'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { LaneModal } from '@/modules/lanes/presentation/components/lane-modals'

interface PostLaneModalPageProps {
  params: Promise<{ operationId: string }>
}

export default async function PostLaneModalPage({
  params
}: PostLaneModalPageProps) {
  const { operationId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.LANES_EDIT}
      unauthorizedMessage={MESSAGES_LANE['8.11']}
    >
      <LaneModal.Post
        title={MESSAGES_LANE['8.4']}
        description={MESSAGES_LANE['8.5']}
      />
    </ModalPermissionGuard>
  )
}
