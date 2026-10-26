import { auth } from '@/auth'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_STATUS_PROCESSING_UNITS } from '@/modules/shared/presentation/messages/status-processing-units'
import { StatusProcessingUnitsModal } from '@/modules/status-processing-units/presentation/components/status-processing-units-modals'
import { UnauthorizedModalToast } from '@/modules/system/presentation/components/unauthorized-modal-toast/unauthorized-modal-toast.component'

interface IgnoreStatusProcessingUnitsModalPageProps {
  params: Promise<{ operationId: string; contractId: string; statusId: string }>
}

export default async function IgnoreStatusProcessingUnitsModalPage({
  params
}: IgnoreStatusProcessingUnitsModalPageProps) {
  const resolvedParams = await params
  const session = await auth()
  const JWT = session?.token
  const isAdmin = session?.user?.isAdmin ?? false
  const { userPermissions } = await loadAuthContext(
    JWT,
    resolvedParams.operationId
  )

  const canEdit =
    isAdmin || userPermissions.has(PermissionEnum.STATUS_EDIT)
  if (!canEdit) {
    return (
      <UnauthorizedModalToast message={MESSAGES_STATUS_PROCESSING_UNITS['25.8']} />
    )
  }

  const hasPermissionUnits =
    isAdmin || userPermissions.has(PermissionEnum.PROCESSING_UNITS_VIEW)

  return (
    <StatusProcessingUnitsModal.Ignore
      title={MESSAGES_STATUS_PROCESSING_UNITS['25.5']}
      description={MESSAGES_STATUS_PROCESSING_UNITS['25.6']}
      statusId={Number(resolvedParams.statusId)}
      hasPermission={hasPermissionUnits}
    />
  )
}
