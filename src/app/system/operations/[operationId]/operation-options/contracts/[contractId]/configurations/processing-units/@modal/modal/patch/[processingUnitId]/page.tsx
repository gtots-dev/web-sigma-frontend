import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_PROCESSING_UNIT } from '@/modules/shared/presentation/messages/processing-unit'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { ProcessingUnitModal } from '@/modules/processing-units/presentation/components/processing-unit-modals'

interface PatchProcessingUnitModalPageProps {
  params: Promise<{
    operationId: string
    processingUnitId: string
  }>
}

export default async function PatchProcessingUnitModalPage({
  params
}: PatchProcessingUnitModalPageProps) {
  const { operationId, processingUnitId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.PROCESSING_UNITS_EDIT}
      unauthorizedMessage={MESSAGES_PROCESSING_UNIT['7.11']}
    >
      <ProcessingUnitModal.Patch
        title={MESSAGES_PROCESSING_UNIT['7.7']}
        description={MESSAGES_PROCESSING_UNIT['7.8']}
        processingUnitId={Number(processingUnitId)}
      />
    </ModalPermissionGuard>
  )
}
