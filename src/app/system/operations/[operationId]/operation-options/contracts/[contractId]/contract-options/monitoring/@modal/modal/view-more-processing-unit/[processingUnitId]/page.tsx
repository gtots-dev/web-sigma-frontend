import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MonitoringModal } from '@/modules/monitoring/presentation/components/monitoring-modals'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'

interface ViewMoreMonitoringProcessingUnitModalPageProps {
  params: Promise<{
    operationId: string
    contractId: string
    processingUnitId: string
  }>
}

export default async function ViewMoreMonitoringProcessingUnitModalPage({
  params
}: ViewMoreMonitoringProcessingUnitModalPageProps) {
  const { operationId, processingUnitId } = await params
  const parsedId = Number(processingUnitId)

  if (!Number.isInteger(parsedId) || parsedId <= 0) return null

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.STATUS_DASHBOARD_VIEW}
    >
      <MonitoringModal.ViewMoreProcessingUnit processingUnitId={parsedId} />
    </ModalPermissionGuard>
  )
}
