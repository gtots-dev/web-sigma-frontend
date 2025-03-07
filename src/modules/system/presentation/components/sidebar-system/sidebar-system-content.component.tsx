import {
  SidebarContent,
  SidebarMenu
} from '@/modules/shared/presentation/components/shadcn/sidebar'
import type { ReactNode } from 'react'

interface SidebarSystemContentComponentProps {
  children: ReactNode
}

export function SidebarSystemContentComponent({
  children
}: SidebarSystemContentComponentProps) {
  return (
    <SidebarContent className="p-0">
      <SidebarMenu className="border-t h-16">{children}</SidebarMenu>
    </SidebarContent>
  )
}
