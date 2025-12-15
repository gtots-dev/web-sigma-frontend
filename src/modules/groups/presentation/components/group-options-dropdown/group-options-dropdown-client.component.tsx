'use client'

import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { GroupOptionsDropdown } from '.'
import { PatchGroupMenu } from '../patch-group-menu'
import { PatchGroupMenuComponent } from '../patch-group-menu/patch-group-menu.component'
import { PatchGroupStatusMenu } from '../patch-group-status-menu'
import { PatchGroupStatusMenuComponent } from '../patch-group-status-menu/patch-group-status-menu.component'
import { PostGroupLaneMenu } from '../post-group-lane-menu'
import { PostGroupLaneMenuComponent } from '../post-group-lane-menu/post-group-lane-menu.component'
import { ViewMoreGroupMenu } from '../view-more-group-menu'
import { ViewMoreGroupMenuComponent } from '../view-more-group-menu/view-more-group-menu.component'
import { PostGroupPointMenuComponent } from '../post-group-point-menu/post-group-point-menu.component'
import { PostGroupPointMenu } from '../post-group-point-menu'
import { PostGroupSubgroupMenuComponent } from '../post-group-subgroup-menu/post-group-subgroup-menu.component'
import { PostGroupSubgroupMenu } from '../post-group-subgroup-menu'

export function GroupOptionsDropdownClient({
  isAdmin,
  patchTitle,
  patchDescription,
  permissions,
  patchStatusTitle,
  patchStatusDescription,
  postGroupLaneTitle,
  postGroupLaneDescription,
  postGroupPointTitle,
  postGroupPointDescription,
  postGroupSubgroupTitle,
  postGroupSubgroupDescription,
  viewMoreGroupLaneTitle,
  ViewMoreGroupLaneDescription
}: {
  isAdmin: boolean
  patchTitle: string
  patchDescription: string
  patchStatusTitle: string
  patchStatusDescription: string
  postGroupLaneTitle: string
  postGroupLaneDescription: string
  postGroupPointTitle: string
  postGroupPointDescription: string
  postGroupSubgroupTitle: string  
  postGroupSubgroupDescription: string
  viewMoreGroupLaneTitle: string
  ViewMoreGroupLaneDescription: string
  permissions: Set<PermissionEnum>
}) {
  return (
    <ViewMoreGroupMenu.Provider>
      <PostGroupSubgroupMenu.Provider>
        <PostGroupPointMenu.Provider>
          <PostGroupLaneMenu.Provider>
            <PatchGroupMenu.Provider>
              <PatchGroupStatusMenu.Provider>
                <GroupOptionsDropdown.Root>
                  <GroupOptionsDropdown.Trigger />

                  <GroupOptionsDropdown.Menu>
                    <GroupOptionsDropdown.Item>
                      <ViewMoreGroupMenu.Trigger />
                    </GroupOptionsDropdown.Item>

                    <GroupOptionsDropdown.Item>
                      <PostGroupLaneMenu.Trigger />
                    </GroupOptionsDropdown.Item>

                    <GroupOptionsDropdown.Item>
                      <PostGroupPointMenu.Trigger />
                    </GroupOptionsDropdown.Item>

                    <GroupOptionsDropdown.Item>
                      <PostGroupSubgroupMenu.Trigger />
                    </GroupOptionsDropdown.Item>

                    {(isAdmin ||
                      permissions.has(PermissionEnum.GROUPS_EDIT)) && (
                      <GroupOptionsDropdown.Item>
                        <PatchGroupMenu.Trigger />
                      </GroupOptionsDropdown.Item>
                    )}

                    {(isAdmin ||
                      permissions.has(
                        PermissionEnum.GROUPS_ENABLE_AND_DISABLE
                      )) && (
                      <GroupOptionsDropdown.Item>
                        <PatchGroupStatusMenu.Trigger />
                      </GroupOptionsDropdown.Item>
                    )}
                  </GroupOptionsDropdown.Menu>
                </GroupOptionsDropdown.Root>

                <ViewMoreGroupMenuComponent
                  title={viewMoreGroupLaneTitle}
                  description={ViewMoreGroupLaneDescription}
                />

                <PostGroupLaneMenuComponent
                  title={postGroupLaneTitle}
                  description={postGroupLaneDescription}
                />

                <PostGroupPointMenuComponent
                  title={postGroupPointTitle}
                  description={postGroupPointDescription}
                />

                <PostGroupSubgroupMenuComponent
                  title={postGroupSubgroupTitle}
                  description={postGroupSubgroupDescription}
                />

                {(isAdmin ||
                  permissions.has(
                    PermissionEnum.GROUPS_ENABLE_AND_DISABLE
                  )) && (
                  <PatchGroupStatusMenuComponent
                    title={patchStatusTitle}
                    description={patchStatusDescription}
                  />
                )}

                {(isAdmin || permissions.has(PermissionEnum.GROUPS_EDIT)) && (
                  <PatchGroupMenuComponent
                    title={patchTitle}
                    description={patchDescription}
                  />
                )}
              </PatchGroupStatusMenu.Provider>
            </PatchGroupMenu.Provider>
          </PostGroupLaneMenu.Provider>
        </PostGroupPointMenu.Provider>
      </PostGroupSubgroupMenu.Provider>
    </ViewMoreGroupMenu.Provider>
  )
}
