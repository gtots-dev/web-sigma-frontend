import { auth } from '@/auth'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_STATUS_LANES } from '@/modules/shared/presentation/messages/status-lanes'
import { StatusLanesModal } from '@/modules/status-lanes/presentation/components/status-lanes-modals'
import { UnauthorizedModalToast } from '@/modules/system/presentation/components/unauthorized-modal-toast/unauthorized-modal-toast.component'

interface ViewMoreStatusLanesModalPageProps {
  params: Promise<{ operationId: string; contractId: string; statusId: string }>
}

export default async function ViewMoreStatusLanesModalPage({
  params
}: ViewMoreStatusLanesModalPageProps) {
  const resolvedParams = await params
  const session = await auth()
  const JWT = session?.token
  const isAdmin = session?.user?.isAdmin ?? false
  const { userPermissions } = await loadAuthContext(
    JWT,
    resolvedParams.operationId
  )

  const canView =
    isAdmin || userPermissions.has(PermissionEnum.STATUS_VIEW)
  if (!canView) {
    return (
      <UnauthorizedModalToast message={MESSAGES_STATUS_LANES['26.8']} />
    )
  }

  const hasPermissionLanes =
    isAdmin || userPermissions.has(PermissionEnum.LANES_VIEW)

  return (
    <StatusLanesModal.ViewMore
      title={MESSAGES_STATUS_LANES['26.11']}
      description={MESSAGES_STATUS_LANES['26.12']}
      statusId={Number(resolvedParams.statusId)}
      hasPermission={hasPermissionLanes}
    />
  )
}
