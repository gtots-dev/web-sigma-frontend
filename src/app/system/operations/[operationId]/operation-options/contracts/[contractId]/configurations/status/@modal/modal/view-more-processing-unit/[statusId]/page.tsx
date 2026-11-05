import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_STATUS_PROCESSING_UNITS } from '@/modules/shared/presentation/messages/status-processing-units'
import { StatusProcessingUnitsModal } from '@/modules/status-processing-units/presentation/components/status-processing-units-modals'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'

interface ViewMoreStatusProcessingUnitsModalPageProps {
  params: Promise<{ operationId: string; contractId: string; statusId: string }>
}

export default async function ViewMoreStatusProcessingUnitsModalPage({
  params
}: ViewMoreStatusProcessingUnitsModalPageProps) {
  const { operationId, statusId } = await params
  const parsedId = Number(statusId)

  if (!Number.isInteger(parsedId) || parsedId <= 0) return null

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.STATUS_VIEW}
      unauthorizedMessage={MESSAGES_STATUS_PROCESSING_UNITS['25.8']}
    >
      {({ hasPermission }) => (
        <StatusProcessingUnitsModal.ViewMore
          title={MESSAGES_STATUS_PROCESSING_UNITS['25.11']}
          description={MESSAGES_STATUS_PROCESSING_UNITS['25.12']}
          statusId={parsedId}
          hasPermission={hasPermission(PermissionEnum.PROCESSING_UNITS_VIEW)}
        />
      )}
    </ModalPermissionGuard>
  )
}
