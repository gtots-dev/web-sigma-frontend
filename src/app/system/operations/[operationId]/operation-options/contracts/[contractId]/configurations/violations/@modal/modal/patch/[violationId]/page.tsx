import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_VIOLATIONS } from '@/modules/shared/presentation/messages/violations'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { ViolationModal } from '@/modules/violations/presentation/components/violation-modals'

interface PatchViolationModalPageProps {
  params: Promise<{
    operationId: string
    contractId: string
    violationId: string
  }>
}

export default async function PatchViolationModalPage({
  params
}: PatchViolationModalPageProps) {
  const { operationId, violationId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.VIOLATIONS_EDIT}
      unauthorizedMessage={MESSAGES_VIOLATIONS['23.8']}
    >
      <ViolationModal.Patch
        title={MESSAGES_VIOLATIONS['23.4']}
        description={MESSAGES_VIOLATIONS['23.5']}
        violationId={Number(violationId)}
      />
    </ModalPermissionGuard>
  )
}
