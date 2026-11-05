import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_STATUS_PROCESSING_UNITS } from '@/modules/shared/presentation/messages/status-processing-units'
import { StatusProcessingUnitsModal } from '@/modules/status-processing-units/presentation/components/status-processing-units-modals'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'

interface IgnoreStatusProcessingUnitsModalPageProps {
  params: Promise<{ operationId: string; contractId: string; statusId: string }>
}

export default async function IgnoreStatusProcessingUnitsModalPage({
  params
}: IgnoreStatusProcessingUnitsModalPageProps) {
  const { operationId, statusId } = await params
  const parsedId = Number(statusId)

  if (!Number.isInteger(parsedId) || parsedId <= 0) return null

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.STATUS_EDIT}
      unauthorizedMessage={MESSAGES_STATUS_PROCESSING_UNITS['25.8']}
    >
      {({ hasPermission }) => (
        <StatusProcessingUnitsModal.Ignore
          title={MESSAGES_STATUS_PROCESSING_UNITS['25.5']}
          description={MESSAGES_STATUS_PROCESSING_UNITS['25.6']}
          statusId={parsedId}
          hasPermission={hasPermission(PermissionEnum.PROCESSING_UNITS_VIEW)}
        />
      )}
    </ModalPermissionGuard>
  )
}
