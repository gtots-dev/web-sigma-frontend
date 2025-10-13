'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu
} from '@/modules/shared/presentation/components/shadcn/sidebar'
import type { Item } from '.'
import type { ReactNode } from 'react'

interface SidebarSystemItemParentComponentProps {
  item: Item[]
  children: (item: Item) => ReactNode
}

export default function SidebarSystemItemParentComponent({
  item,
  children
}: SidebarSystemItemParentComponentProps) {
  return (
    <SidebarGroup className="h-full">
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu className="h-full">
        {item?.map((child) => children(child))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
