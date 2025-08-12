'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { AddPermissionProfileMenu } from '.'
import { AddPermissionProfileMenuComponent } from './add-permission-profile-menu.component'

export function AddPermissionProfileMenuClientComponent({
  title,
  description,
  permissions
}: {
  title: string
  description: string
  permissions: Set<PermissionEnum>
}) {
  return (
    <AddPermissionProfileMenu.Provider>
      {permissions.has(PermissionEnum.PERMISSIONS_EDIT) && (
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
