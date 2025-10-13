import type { LucideIcon } from 'lucide-react'
import { SidebarSystemRootComponent } from './sidebar-system-root.component'
import { SidebarSystemHeaderComponent } from './sidebar-system-header.component'
import { SidebarSystemContentComponent } from './sidebar-system-content.component'
import { SidebarSystemFooterComponent } from './sidebar-system-footer.component'
import SidebarSystemItemParentComponent from './sidebar-system-item-parent.component'
import SidebarSystemClientComponent from './sidebar-system-client.component'
import type { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'

export type Item = {
  title: string
  url: string
  icon?: LucideIcon
  permissions: PermissionEnum[]
  isToExpand?: boolean
  items?: Item[]
}

export interface SidebarSystemItemComponentProps {
  item: Item
  activePath: string | null
  className?: string
}

export const SidebarSystem = {
  Root: SidebarSystemRootComponent,
  Header: SidebarSystemHeaderComponent,
  Content: SidebarSystemContentComponent,
  Footer: SidebarSystemFooterComponent,
  Item: SidebarSystemItemParentComponent,
  Client: SidebarSystemClientComponent
}
