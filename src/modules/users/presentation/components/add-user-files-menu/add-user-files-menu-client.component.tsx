'use client'

import { AddUserFilesMenu } from '@/modules/users/presentation/components/add-user-files-menu'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { AddUserFilesMenuComponent } from './add-user-files-menu.component'

export function AddUserFilesMenuClient({
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
    <AddUserFilesMenu.Provider>
      {(isAdmin || permissions.has(PermissionEnum.USERS_EDIT)) && (
        <>
          <AddUserFilesMenu.Trigger />
          <AddUserFilesMenuComponent title={title} description={description} />
        </>
      )}
    </AddUserFilesMenu.Provider>
  )
}
