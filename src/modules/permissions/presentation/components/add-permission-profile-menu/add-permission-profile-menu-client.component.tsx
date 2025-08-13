'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { AddPermissionProfileMenu } from '.'
import { AddPermissionProfileMenuComponent } from './add-permission-profile-menu.component'

export function AddPermissionProfileMenuClientComponent({
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
    <AddPermissionProfileMenu.Provider>
      {(isAdmin || permissions.has(PermissionEnum.PERMISSIONS_EDIT)) && (
        <>
          <AddPermissionProfileMenu.Trigger />
          <AddPermissionProfileMenuComponent
            title={title}
            description={description}
          />
        </>
      )}
    </AddPermissionProfileMenu.Provider>
  )
}
