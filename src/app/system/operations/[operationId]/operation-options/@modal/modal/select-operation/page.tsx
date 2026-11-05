import { OperationModal } from '@/modules/operations/presentation/components/operation-modals'
import { MESSAGES_OPTIONS_OPERATION } from '@/modules/shared/presentation/messages/options-operation'

export default function SelectOperationModalPage() {
  return (
    <OperationModal.Select
      title={MESSAGES_OPTIONS_OPERATION['11.8']}
      description={MESSAGES_OPTIONS_OPERATION['11.9']}
    />
  )
}
