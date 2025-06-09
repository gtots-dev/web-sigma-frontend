import type { LucideIcon } from 'lucide-react'
import { SidebarSystemRootComponent } from './sidebar-system-root.component'
import { SidebarSystemHeaderComponent } from './sidebar-system-header.component'
import { SidebarSystemContentComponent } from './sidebar-system-content.component'
import { SidebarSystemFooterComponent } from './sidebar-system-footer.component'
import SidebarSystemItemParentComponent from './sidebar-system-item-parent.component'

export type Item = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  isToExpand?: boolean
  items?: Item[]
}

export interface SidebarSystemItemComponentProps {
  item: Item
  activePath: string | null
}

export const SidebarSystem = {
  Root: SidebarSystemRootComponent,
  Header: SidebarSystemHeaderComponent,
  Content: SidebarSystemContentComponent,
  Footer: SidebarSystemFooterComponent,
  Item: SidebarSystemItemParentComponent
}
