'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { PointOptionsDropdown } from '.'
import { PatchPointMenu } from '../patch-point-menu'
import { PatchPointMenuComponent } from '../patch-point-menu/patch-point-menu.component'
import { PatchPointStatusMenu } from '../patch-point-status-menu'
import { PatchPointStatusMenuComponent } from '../patch-point-status-menu/patch-point-status-menu.component'
import { PostPointLaneMenu } from '../post-point-lane-menu'
import { PostPointLaneMenuComponent } from '../post-point-lane-menu/post-point-lane-menu.component'

export function PointOptionsDropdownClient({
  isAdmin,
  patchTitle,
  patchDescription,
  permissions,
  patchStatusTitle,
  patchStatusDescription,
  postPointLaneTitle,
  postPointLaneDescription
}: {
  isAdmin: boolean
  patchTitle: string
  patchDescription: string
  patchStatusTitle: string
  patchStatusDescription: string
  postPointLaneTitle: string
  postPointLaneDescription: string
  permissions: Set<PermissionEnum>
}) {
  return (
    <PostPointLaneMenu.Provider>
      <PatchPointMenu.Provider>
        <PatchPointStatusMenu.Provider>
          <PointOptionsDropdown.Root>
            <PointOptionsDropdown.Trigger />

            <PointOptionsDropdown.Menu>
              {isAdmin && (
                <PointOptionsDropdown.Item>
                  <PostPointLaneMenu.Trigger />
                </PointOptionsDropdown.Item>
              )}

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

          {isAdmin && (
            <PostPointLaneMenuComponent
              title={postPointLaneTitle}
              description={postPointLaneDescription}
            />
          )}

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
    </PostPointLaneMenu.Provider>
  )
}
