import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_POINT } from '@/modules/shared/presentation/messages/points'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { PointModal } from '@/modules/points/presentation/components/point-modals'

interface PostPointModalPageProps {
  params: Promise<{ operationId: string }>
}

export default async function PostPointModalPage({
  params
}: PostPointModalPageProps) {
  const { operationId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.POINTS_EDIT}
      unauthorizedMessage={MESSAGES_POINT['14.17']}
    >
      <PointModal.Post
        title={MESSAGES_POINT['14.4']}
        description={MESSAGES_POINT['14.5']}
      />
    </ModalPermissionGuard>
  )
}
