'use client'

import { AddUserMenu } from '.'
import { AddUserMenuComponent } from './add-user-menu.component'
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
