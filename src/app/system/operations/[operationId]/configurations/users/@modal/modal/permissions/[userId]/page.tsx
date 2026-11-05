import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { MESSAGES_USERS } from '@/modules/shared/presentation/messages/users'
import { ModalPermissionGuard } from '@/modules/system/presentation/components/modal-permission-guard/modal-permission-guard.component'
import { UserModals } from '@/modules/users/presentation/components/user-modals'

interface BindUserPermissionProfilesModalPageProps {
  params: Promise<{
    operationId: string
    userId: string
  }>
}

export default async function BindUserPermissionProfilesModalPage({
  params
}: BindUserPermissionProfilesModalPageProps) {
  const { operationId, userId } = await params
  const parsedId = Number(userId)

  if (!Number.isInteger(parsedId) || parsedId <= 0) return null

  return (
    <ModalPermissionGuard
      operationId={operationId}
      permission={PermissionEnum.USERS_EDIT}
      unauthorizedMessage={MESSAGES_USERS['5.39']}
    >
      {({ hasPermission }) => (
        <UserModals.BindPermissionProfiles
          title={MESSAGES_USERS['5.16']}
          description={MESSAGES_USERS['5.17']}
          userId={parsedId}
          isPermittedViewContracts={hasPermission(
            PermissionEnum.CONTRACTS_VIEW
          )}
          isPermittedViewPermissionsProfile={hasPermission(
            PermissionEnum.PERMISSIONS_VIEW
          )}
        />
      )}
    </ModalPermissionGuard>
  )
}
