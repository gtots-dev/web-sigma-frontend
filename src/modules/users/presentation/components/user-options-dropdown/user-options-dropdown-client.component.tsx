'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { UserOptionsDropdown } from '.'
import { UserModalTriggers } from '../user-modal-triggers'
import { useTableUser } from '../../contexts/table-user.context'

export function UserOptionsDropdownClient({
  isAdmin,
  permissions,
  userAuthenticated
}: {
  isAdmin: boolean
  permissions: Set<PermissionEnum>
  userAuthenticated: string
}) {
  const { id: userListId } = useTableUser()
  const isSameUser = userAuthenticated === String(userListId)

  const hasAnyValidPermission =
    isAdmin ||
    permissions.has(PermissionEnum.USERS_VIEW) ||
    permissions.has(PermissionEnum.USERS_EDIT) ||
    permissions.has(PermissionEnum.USERS_PASSWORD_RESET) ||
    permissions.has(PermissionEnum.USERS_ENABLE_AND_DISABLE)

  if (!hasAnyValidPermission) return null

  return (
    <UserOptionsDropdown.Root>
      <UserOptionsDropdown.Trigger />
      <UserOptionsDropdown.Menu>
        <UserOptionsDropdown.Item>
          <UserModalTriggers.ViewMore />
        </UserOptionsDropdown.Item>

        {(isAdmin || permissions.has(PermissionEnum.USERS_EDIT)) && (
          <UserOptionsDropdown.Item>
            <UserModalTriggers.Patch />
          </UserOptionsDropdown.Item>
        )}

        {(isAdmin || permissions.has(PermissionEnum.USERS_EDIT)) && (
          <UserOptionsDropdown.Item>
            <UserModalTriggers.BindPermissionProfiles />
          </UserOptionsDropdown.Item>
        )}

        {(isAdmin || permissions.has(PermissionEnum.USERS_EDIT)) && (
          <UserOptionsDropdown.Item>
            <UserModalTriggers.PostFiles />
          </UserOptionsDropdown.Item>
        )}

        {(isAdmin || permissions.has(PermissionEnum.USERS_PASSWORD_RESET)) && (
          <UserOptionsDropdown.Item>
            <UserModalTriggers.PutPasswordReset />
          </UserOptionsDropdown.Item>
        )}

        {!isSameUser &&
          (isAdmin ||
            permissions.has(PermissionEnum.USERS_ENABLE_AND_DISABLE)) && (
            <UserOptionsDropdown.Item>
              <UserModalTriggers.PatchStatus />
            </UserOptionsDropdown.Item>
          )}
      </UserOptionsDropdown.Menu>
    </UserOptionsDropdown.Root>
  )
}
