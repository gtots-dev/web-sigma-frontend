'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { PointOptionsDropdown } from '.'
import { PatchPointMenu } from '../patch-point-menu'
import { PatchPointMenuComponent } from '../patch-point-menu/patch-point-menu.component'
import { PatchPointStatusMenu } from '../patch-point-status-menu'
import { PatchPointStatusMenuComponent } from '../patch-point-status-menu/patch-point-status-menu.component'

export function PointOptionsDropdownClient({
  isAdmin,
  patchTitle,
  patchDescription,
  permissions,
  patchStatusTitle,
  patchStatusDescription
}: {
  isAdmin: boolean
  patchTitle: string
  patchDescription: string
  patchStatusTitle: string
  patchStatusDescription: string
  permissions: Set<PermissionEnum>
}) {
  return (
    <PatchPointMenu.Provider>
      <PatchPointStatusMenu.Provider>
        <PointOptionsDropdown.Root>
          <PointOptionsDropdown.Trigger />

          <PointOptionsDropdown.Menu>
            {(isAdmin || permissions.has(PermissionEnum.POINTS_EDIT)) && (
              <PointOptionsDropdown.Item>
                <PatchPointMenu.Trigger />
              </PointOptionsDropdown.Item>
            )}

            {(isAdmin ||
              permissions.has(PermissionEnum.POINTS_ENABLE_AND_DISABLE)) && (
              <PointOptionsDropdown.Item>
                <PatchPointStatusMenu.Trigger />
              </PointOptionsDropdown.Item>
            )}
          </PointOptionsDropdown.Menu>
        </PointOptionsDropdown.Root>

        {(isAdmin ||
          permissions.has(PermissionEnum.POINTS_ENABLE_AND_DISABLE)) && (
          <PatchPointStatusMenuComponent
            title={patchStatusTitle}
            description={patchStatusDescription}
          />
        )}

        {(isAdmin || permissions.has(PermissionEnum.POINTS_EDIT)) && (
          <PatchPointMenuComponent
            title={patchTitle}
            description={patchDescription}
          />
        )}
      </PatchPointStatusMenu.Provider>
    </PatchPointMenu.Provider>
  )
}
