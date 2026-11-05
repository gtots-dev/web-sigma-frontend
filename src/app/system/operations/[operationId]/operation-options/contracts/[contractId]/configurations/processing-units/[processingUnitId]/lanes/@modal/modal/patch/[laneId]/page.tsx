import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_LANE } from '@/modules/shared/presentation/messages/lanes'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { LaneModal } from '@/modules/lanes/presentation/components/lane-modals'

interface PatchLaneModalPageProps {
  params: Promise<{
    operationId: string
    laneId: string
  }>
}

export default async function PatchLaneModalPage({
  params
}: PatchLaneModalPageProps) {
  const { operationId, laneId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.LANES_EDIT}
      unauthorizedMessage={MESSAGES_LANE['8.11']}
    >
      <LaneModal.Patch
        title={MESSAGES_LANE['8.7']}
        description={MESSAGES_LANE['8.8']}
        laneId={Number(laneId)}
      />
    </ModalPermissionGuard>
  )
}
