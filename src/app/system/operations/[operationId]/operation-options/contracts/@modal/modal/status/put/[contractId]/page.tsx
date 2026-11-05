import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'
import { ContractModal } from '@/modules/contracts/presentation/components/contract-modals'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'

interface PutContractStatusModalPageProps {
  params: Promise<{ operationId: string; contractId: string }>
}

export default async function PutContractStatusModalPage({
  params
}: PutContractStatusModalPageProps) {
  const { operationId, contractId } = await params
  const parsedId = Number(contractId)

  if (!Number.isInteger(parsedId) || parsedId <= 0) return null

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.CONTRACTS_ENABLE_AND_DISABLE}
      unauthorizedMessage={MESSAGES_CONTRACTS['3.22']}
    >
      <ContractModal.PutStatus
        title={MESSAGES_CONTRACTS['3.25']}
        description={MESSAGES_CONTRACTS['3.26']}
        contractId={parsedId}
      />
    </ModalPermissionGuard>
  )
}
