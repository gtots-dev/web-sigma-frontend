'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu
} from '@/modules/shared/presentation/components/shadcn/sidebar'
import { usePathname } from 'next/navigation'
import { SidebarSystemItemChildComponent } from './sidebar-system-item-child.component'
import type { Item } from '.'

interface SidebarSystemItemParentComponentProps {
  item: Item
}

export default function SidebarSystemItemParentComponent({
  item
}: SidebarSystemItemParentComponentProps) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="h-full">
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu className="h-full">
        <SidebarSystemItemChildComponent
          key={item.title}
          item={item}
          activePath={pathname}
        />
      </SidebarMenu>
    </SidebarGroup>
  )
}
