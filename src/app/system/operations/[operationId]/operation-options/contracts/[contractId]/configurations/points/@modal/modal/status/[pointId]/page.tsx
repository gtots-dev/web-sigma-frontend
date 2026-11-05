import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_POINT } from '@/modules/shared/presentation/messages/points'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { PointModal } from '@/modules/points/presentation/components/point-modals'

interface PatchPointStatusModalPageProps {
  params: Promise<{
    operationId: string
    contractId: string
    pointId: string
  }>
}

export default async function PatchPointStatusModalPage({
  params
}: PatchPointStatusModalPageProps) {
  const { operationId, pointId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.POINTS_ENABLE_AND_DISABLE}
      unauthorizedMessage={MESSAGES_POINT['14.17']}
    >
      <PointModal.PatchStatus
        title={MESSAGES_POINT['14.9']}
        description={MESSAGES_POINT['14.10']}
        pointId={Number(pointId)}
      />
    </ModalPermissionGuard>
  )
}
