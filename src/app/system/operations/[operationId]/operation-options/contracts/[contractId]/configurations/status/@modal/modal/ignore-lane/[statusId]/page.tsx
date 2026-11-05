import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_STATUS_LANES } from '@/modules/shared/presentation/messages/status-lanes'
import { StatusLanesModal } from '@/modules/status-lanes/presentation/components/status-lanes-modals'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'

interface IgnoreStatusLanesModalPageProps {
  params: Promise<{ operationId: string; contractId: string; statusId: string }>
}

export default async function IgnoreStatusLanesModalPage({
  params
}: IgnoreStatusLanesModalPageProps) {
  const { operationId, statusId } = await params
  const parsedId = Number(statusId)

  if (!Number.isInteger(parsedId) || parsedId <= 0) return null

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.STATUS_EDIT}
      unauthorizedMessage={MESSAGES_STATUS_LANES['26.8']}
    >
      {({ hasPermission }) => (
        <StatusLanesModal.Ignore
          title={MESSAGES_STATUS_LANES['26.5']}
          description={MESSAGES_STATUS_LANES['26.6']}
          statusId={parsedId}
          hasPermission={hasPermission(PermissionEnum.LANES_VIEW)}
        />
      )}
    </ModalPermissionGuard>
  )
}
