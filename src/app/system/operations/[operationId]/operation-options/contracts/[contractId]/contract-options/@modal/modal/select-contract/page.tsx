import { ContractModal } from '@/modules/contracts/presentation/components/contract-modals'
import { MESSAGES_CONTRACTS } from '@/modules/shared/presentation/messages/contracts'
import { MESSAGES_OPTIONS_CONTRACT } from '@/modules/shared/presentation/messages/options-contract'
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
        title={MESSAGES_OPTIONS_CONTRACT['16.7']}
        description={MESSAGES_OPTIONS_CONTRACT['16.8']}
      />
    </ModalPermissionGuard>
  )
}
