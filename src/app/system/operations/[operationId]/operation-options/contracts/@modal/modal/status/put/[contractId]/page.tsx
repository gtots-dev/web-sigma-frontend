import { auth } from '@/auth'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'
import { ContractModal } from '@/modules/contracts/presentation/components/contract-modals'
import { UnauthorizedModalToast } from '@/modules/system/presentation/components/unauthorized-modal-toast/unauthorized-modal-toast.component'

interface PutContractStatusModalPageProps {
  params: Promise<{ operationId: string; contractId: string }>
}

export default async function PutContractStatusModalPage({ params }: PutContractStatusModalPageProps) {
  const resolvedParams = await params
  const session = await auth()
  const JWT = session?.token
  const isAdmin = session?.user?.isAdmin ?? false
  const { userPermissions } = await loadAuthContext(JWT, resolvedParams.operationId)

  const canToggleStatus =
    isAdmin || userPermissions.has(PermissionEnum.CONTRACTS_ENABLE_AND_DISABLE)
  if (!canToggleStatus) {
    return <UnauthorizedModalToast message={MESSAGES_CONTRACTS['3.22']} />
  }

  return (
    <ContractModal.PutStatus
      title={MESSAGES_CONTRACTS['3.25']}
      description={MESSAGES_CONTRACTS['3.26']}
      contractId={Number(resolvedParams.contractId)}
    />
  )
}
