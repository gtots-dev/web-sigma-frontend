import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_RESTRICTIONS } from '@/modules/shared/presentation/messages/restrictions'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { RestrictionModal } from '@/modules/restrictions/presentation/components/restriction-modals'

interface PatchRestrictionModalPageProps {
  params: Promise<{
    operationId: string
    contractId: string
    restrictionId: string
  }>
}

export default async function PatchRestrictionModalPage({
  params
}: PatchRestrictionModalPageProps) {
  const { operationId, restrictionId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.RESTRICTIONS_EDIT}
      unauthorizedMessage={MESSAGES_RESTRICTIONS['24.13']}
    >
      <RestrictionModal.Patch
        title={MESSAGES_RESTRICTIONS['24.10']}
        description={MESSAGES_RESTRICTIONS['24.11']}
        restrictionId={Number(restrictionId)}
      />
    </ModalPermissionGuard>
  )
}
