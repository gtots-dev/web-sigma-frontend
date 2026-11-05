import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_LANE } from '@/modules/shared/presentation/messages/lanes'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { LaneModal } from '@/modules/lanes/presentation/components/lane-modals'

interface PatchLaneStatusModalPageProps {
  params: Promise<{
    operationId: string
    laneId: string
  }>
}

export default async function PatchLaneStatusModalPage({
  params
}: PatchLaneStatusModalPageProps) {
  const { operationId, laneId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.LANES_ENABLE_AND_DISABLE}
      unauthorizedMessage={MESSAGES_LANE['8.11']}
    >
      <LaneModal.PatchStatus
        title={MESSAGES_LANE['8.9']}
        description={MESSAGES_LANE['8.10']}
        laneId={Number(laneId)}
      />
    </ModalPermissionGuard>
  )
}
