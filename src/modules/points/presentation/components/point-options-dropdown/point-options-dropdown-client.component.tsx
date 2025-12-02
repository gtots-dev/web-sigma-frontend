'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { PointOptionsDropdown } from '.'
import { PatchPointMenu } from '../patch-point-menu'
import { PatchPointMenuComponent } from '../patch-point-menu/patch-point-menu.component'
import { PatchPointStatusMenu } from '../patch-point-status-menu'
import { PatchPointStatusMenuComponent } from '../patch-point-status-menu/patch-point-status-menu.component'
import { PostPointLaneMenu } from '../post-point-lane-menu'
import { PostPointLaneMenuComponent } from '../post-point-lane-menu/post-point-lane-menu.component'
import { ViewMorePointMenu } from '../view-more-point-menu'
import { ViewMorePointMenuComponent } from '../view-more-point-menu/view-more-point-menu.component'

export function PointOptionsDropdownClient({
  isAdmin,
  patchTitle,
  patchDescription,
  permissions,
  patchStatusTitle,
  patchStatusDescription,
  postPointLaneTitle,
  postPointLaneDescription,
  viewMorePointLaneTitle,
  ViewMorePointLaneDescription
}: {
  isAdmin: boolean
  patchTitle: string
  patchDescription: string
  patchStatusTitle: string
  patchStatusDescription: string
  postPointLaneTitle: string
  postPointLaneDescription: string
  viewMorePointLaneTitle: string
  ViewMorePointLaneDescription: string
  permissions: Set<PermissionEnum>
}) {
  return (
    <ViewMorePointMenu.Provider>
      <PostPointLaneMenu.Provider>
        <PatchPointMenu.Provider>
          <PatchPointStatusMenu.Provider>
            <PointOptionsDropdown.Root>
              <PointOptionsDropdown.Trigger />

              <PointOptionsDropdown.Menu>
                <PointOptionsDropdown.Item>
                  <ViewMorePointMenu.Trigger />
                </PointOptionsDropdown.Item>

                <PointOptionsDropdown.Item>
                  <PostPointLaneMenu.Trigger />
                </PointOptionsDropdown.Item>

                {(isAdmin || permissions.has(PermissionEnum.POINTS_EDIT)) && (
                  <PointOptionsDropdown.Item>
                    <PatchPointMenu.Trigger />
                  </PointOptionsDropdown.Item>
                )}

                {(isAdmin ||
                  permissions.has(
                    PermissionEnum.POINTS_ENABLE_AND_DISABLE
                  )) && (
                  <PointOptionsDropdown.Item>
                    <PatchPointStatusMenu.Trigger />
                  </PointOptionsDropdown.Item>
                )}
              </PointOptionsDropdown.Menu>
            </PointOptionsDropdown.Root>

            {
              <ViewMorePointMenuComponent
                title={viewMorePointLaneTitle}
                description={ViewMorePointLaneDescription}
              />
            }

            <PostPointLaneMenuComponent
              title={postPointLaneTitle}
              description={postPointLaneDescription}
            />

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
    </ViewMorePointMenu.Provider>
  )
}
