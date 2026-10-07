import { auth } from '@/auth'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { ContractModal } from '@/modules/contracts/presentation/components/contract-modals'
import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'
import { UnauthorizedModalToast } from '@/modules/system/presentation/components/unauthorized-modal-toast/unauthorized-modal-toast.component'

interface PostContractModalPageProps {
  params: Promise<{ operationId: string }>
}

export default async function PostContractModalPage({ params }: PostContractModalPageProps) {
  const resolvedParams = await params
  const session = await auth()
  const JWT = session?.token
  const isAdmin = session?.user?.isAdmin ?? false
  const { userPermissions } = await loadAuthContext(JWT, resolvedParams.operationId)

  const canEdit = isAdmin || userPermissions.has(PermissionEnum.CONTRACTS_EDIT)
  if (!canEdit) {
    return <UnauthorizedModalToast message={MESSAGES_CONTRACTS['3.22']} />
  }

  return (
    <ContractModal.Post
      title={MESSAGES_CONTRACTS['3.4']}
      description={MESSAGES_CONTRACTS['3.5']}
    />
  )
}
