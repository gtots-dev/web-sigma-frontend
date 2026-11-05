import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_POINT } from '@/modules/shared/presentation/messages/points'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { PointModal } from '@/modules/points/presentation/components/point-modals'

interface PatchPointModalPageProps {
  params: Promise<{
    operationId: string
    contractId: string
    pointId: string
  }>
}

export default async function PatchPointModalPage({
  params
}: PatchPointModalPageProps) {
  const { operationId, pointId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.POINTS_EDIT}
      unauthorizedMessage={MESSAGES_POINT['14.17']}
    >
      <PointModal.Patch
        title={MESSAGES_POINT['14.7']}
        description={MESSAGES_POINT['14.8']}
        pointId={Number(pointId)}
      />
    </ModalPermissionGuard>
  )
}
