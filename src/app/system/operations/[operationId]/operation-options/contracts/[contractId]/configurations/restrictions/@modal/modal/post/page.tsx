import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_RESTRICTIONS } from '@/modules/shared/presentation/messages/restrictions'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { RestrictionModal } from '@/modules/restrictions/presentation/components/restriction-modals'

interface PostRestrictionModalPageProps {
  params: Promise<{ operationId: string }>
}

export default async function PostRestrictionModalPage({
  params
}: PostRestrictionModalPageProps) {
  const { operationId } = await params

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.RESTRICTIONS_EDIT}
      unauthorizedMessage={MESSAGES_RESTRICTIONS['24.13']}
    >
      <RestrictionModal.Post
        title={MESSAGES_RESTRICTIONS['24.4']}
        description={MESSAGES_RESTRICTIONS['24.5']}
      />
    </ModalPermissionGuard>
  )
}
