import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_POINT } from '@/modules/shared/presentation/messages/points'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { PointModal } from '@/modules/points/presentation/components/point-modals'

interface ViewMorePointModalPageProps {
  params: Promise<{
    operationId: string
    contractId: string
    pointId: string
  }>
}

export default async function ViewMorePointModalPage({
  params
}: ViewMorePointModalPageProps) {
  const { operationId, pointId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.POINTS_VIEW}
      unauthorizedMessage={MESSAGES_POINT['14.17']}
    >
      {({ hasPermission }) => (
        <PointModal.ViewMore
          title={MESSAGES_POINT['14.15']}
          description={MESSAGES_POINT['14.16']}
          pointId={Number(pointId)}
          isPermittedLane={hasPermission(PermissionEnum.LANES_VIEW)}
        />
      )}
    </ModalPermissionGuard>
  )
}
