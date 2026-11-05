import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_PROCESSING_UNIT } from '@/modules/shared/presentation/messages/processing-unit'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { ProcessingUnitModal } from '@/modules/processing-units/presentation/components/processing-unit-modals'

interface PostProcessingUnitModalPageProps {
  params: Promise<{ operationId: string }>
}

export default async function PostProcessingUnitModalPage({
  params
}: PostProcessingUnitModalPageProps) {
  const { operationId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.PROCESSING_UNITS_EDIT}
      unauthorizedMessage={MESSAGES_PROCESSING_UNIT['7.11']}
    >
      <ProcessingUnitModal.Post
        title={MESSAGES_PROCESSING_UNIT['7.4']}
        description={MESSAGES_PROCESSING_UNIT['7.5']}
      />
    </ModalPermissionGuard>
  )
}
