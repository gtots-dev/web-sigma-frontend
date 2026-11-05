import { OperationModal } from '@/modules/operations/presentation/components/operation-modals'
import { MESSAGES_CONFIGURATION_OPERATION } from '@/modules/shared/presentation/messages/configuration-operation'

export default function SelectOperationModalPage() {
  return (
    <OperationModal.Select
      title={MESSAGES_CONFIGURATION_OPERATION['14.10']}
      description={MESSAGES_CONFIGURATION_OPERATION['14.11']}
    />
  )
}
