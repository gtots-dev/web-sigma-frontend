import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { ContractModal } from '@/modules/contracts/presentation/components/contract-modals'
import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'

interface PostContractModalPageProps {
  params: Promise<{ operationId: string }>
}

export default async function PostContractModalPage({
  params
}: PostContractModalPageProps) {
  const { operationId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.CONTRACTS_EDIT}
      unauthorizedMessage={MESSAGES_CONTRACTS['3.22']}
    >
      <ContractModal.Post
        title={MESSAGES_CONTRACTS['3.4']}
        description={MESSAGES_CONTRACTS['3.5']}
      />
    </ModalPermissionGuard>
  )
}
