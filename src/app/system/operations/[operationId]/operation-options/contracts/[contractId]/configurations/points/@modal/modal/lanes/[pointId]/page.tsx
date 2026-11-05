import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_POINT } from '@/modules/shared/presentation/messages/points'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { PointModal } from '@/modules/points/presentation/components/point-modals'

interface PostPointLaneModalPageProps {
  params: Promise<{
    operationId: string
    contractId: string
    pointId: string
  }>
}

export default async function PostPointLaneModalPage({
  params
}: PostPointLaneModalPageProps) {
  const { operationId, pointId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.POINTS_EDIT}
      unauthorizedMessage={MESSAGES_POINT['14.17']}
    >
      {({ hasPermission }) => (
        <PointModal.PostLane
          title={MESSAGES_POINT['14.11']}
          description={MESSAGES_POINT['14.12']}
          pointId={Number(pointId)}
          isPermittedLane={hasPermission(PermissionEnum.LANES_VIEW)}
        />
      )}
    </ModalPermissionGuard>
  )
}
