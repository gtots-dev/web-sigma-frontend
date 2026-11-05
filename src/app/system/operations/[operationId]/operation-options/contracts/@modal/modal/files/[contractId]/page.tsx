import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'
import { ContractModal } from '@/modules/contracts/presentation/components/contract-modals'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'

interface PostContractFilesModalPageProps {
  params: Promise<{ operationId: string; contractId: string }>
}

export default async function PostContractFilesModalPage({
  params
}: PostContractFilesModalPageProps) {
  const { operationId, contractId } = await params
  const parsedId = Number(contractId)

  if (!Number.isInteger(parsedId) || parsedId <= 0) return null

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.CONTRACTS_EDIT}
      unauthorizedMessage={MESSAGES_CONTRACTS['3.22']}
    >
      <ContractModal.Files
        title={MESSAGES_CONTRACTS['3.27']}
        description={MESSAGES_CONTRACTS['3.28']}
        contractId={parsedId}
      />
    </ModalPermissionGuard>
  )
}
