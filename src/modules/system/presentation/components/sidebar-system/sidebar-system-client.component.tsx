'use client'

import { SidebarSystem } from '@/modules/system/presentation/components/sidebar-system'
import { UserDropdown } from '../user-dropdown'
import { SidebarSystemItemChildComponent } from './sidebar-system-item-child.component'
import { SidebarSystemItemGrandchildComponent } from './sidebar-system-item-grandchild.component'
import { useSidebarSystemData } from '../../hooks/use-sidebar-system-data.hook'
import type { UserPermissionsInterface } from '@/modules/users/domain/interfaces/user-permissions.interface'

interface SidebarSystemClientComponentProps {
  permissions: UserPermissionsInterface
  user: {
    isAdmin: boolean
    name: string
    email: string
  }
}

export default function SidebarSystemClientComponent({
  user,
  permissions
}: SidebarSystemClientComponentProps) {
  const { pathname, sidebarData } = useSidebarSystemData(
    permissions,
    user.isAdmin
  )

  return (
    <SidebarSystem.Root>
      <SidebarSystem.Header />
      <SidebarSystem.Content>
        <SidebarSystem.Item item={sidebarData}>
          {(childItem) => (
            <SidebarSystemItemChildComponent
              key={childItem.title}
              item={childItem}
              activePath={pathname}
            >
              {(grandchildItem) => (
                <SidebarSystemItemGrandchildComponent
                  key={grandchildItem.title}
                  item={grandchildItem}
                  activePath={pathname}
                />
              )}
            </SidebarSystemItemChildComponent>
          )}
        </SidebarSystem.Item>
      </SidebarSystem.Content>

      <SidebarSystem.Footer>
        <UserDropdown.Root>
          <UserDropdown.Trigger user={user} />
          <UserDropdown.Menu user={user} />
        </UserDropdown.Root>
      </SidebarSystem.Footer>
    </SidebarSystem.Root>
  )
}
