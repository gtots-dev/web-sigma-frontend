'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { PostGroupMenu } from '.'
import { PostGroupMenuComponent } from './post-group-menu.component'

export function PostGroupMenuMenuClientComponent({
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
    <PostGroupMenu.Provider>
      {(isAdmin || permissions.has(PermissionEnum.GROUPS_EDIT)) && (
        <>
          <PostGroupMenu.Trigger />
          <PostGroupMenuComponent
            title={title}
            description={description}
          />
        </>
      )}
    </PostGroupMenu.Provider>
  )
}
