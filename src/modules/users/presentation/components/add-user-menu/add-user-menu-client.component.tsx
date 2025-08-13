'use client'

import { AddUserMenu } from '@/modules/users/presentation/components/add-user-menu'
import { AddUserMenuComponent } from '@/modules/users/presentation/components/add-user-menu/add-user-menu.component'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'

export function AddUserMenuClient({
  isAdmin,
  title,
  description,
  permissions
}: {
  isAdmin: boolean
  title: string
  description: string
  permissions: Set<PermissionEnum>
}) {
  return (
    <AddUserMenu.Provider>
      {(isAdmin || permissions.has(PermissionEnum.USERS_EDIT)) && (
        <>
          <AddUserMenu.Trigger />
          <AddUserMenuComponent title={title} description={description} />
        </>
      )}
    </AddUserMenu.Provider>
  )
}
