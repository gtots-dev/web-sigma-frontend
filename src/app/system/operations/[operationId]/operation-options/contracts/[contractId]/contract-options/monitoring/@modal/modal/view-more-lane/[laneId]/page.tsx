import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MonitoringModal } from '@/modules/monitoring/presentation/components/monitoring-modals'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'

interface ViewMoreMonitoringLaneModalPageProps {
  params: Promise<{
    operationId: string
    contractId: string
    laneId: string
  }>
}

export default async function ViewMoreMonitoringLaneModalPage({
  params
}: ViewMoreMonitoringLaneModalPageProps) {
  const { operationId, laneId } = await params
  const parsedId = Number(laneId)

  if (!Number.isInteger(parsedId) || parsedId <= 0) return null

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.STATUS_DASHBOARD_VIEW}
    >
      <MonitoringModal.ViewMoreLane laneId={parsedId} />
    </ModalPermissionGuard>
  )
}
