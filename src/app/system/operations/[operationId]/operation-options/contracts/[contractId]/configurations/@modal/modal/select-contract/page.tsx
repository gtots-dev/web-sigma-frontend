import { ContractModal } from '@/modules/contracts/presentation/components/contract-modals'
import { MESSAGES_CONFIGURATION_CONTRACT } from '@/modules/shared/presentation/messages/configuration-contract'
import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'

interface SelectContractModalPageProps {
  params: Promise<{ operationId: string }>
}

export default async function SelectContractModalPage({
  params
}: SelectContractModalPageProps) {
  const { operationId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.CONTRACTS_VIEW}
      unauthorizedMessage={MESSAGES_CONTRACTS['3.22']}
    >
      <ContractModal.Select
        title={MESSAGES_CONFIGURATION_CONTRACT['17.8']}
        description={MESSAGES_CONFIGURATION_CONTRACT['17.9']}
      />
    </ModalPermissionGuard>
  )
}
