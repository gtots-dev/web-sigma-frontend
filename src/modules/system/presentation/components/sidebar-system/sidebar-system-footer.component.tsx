import {
  SidebarFooter,
  SidebarMenu
} from '@/modules/shared/presentation/components/shadcn/sidebar'
import type { ReactNode } from 'react'

interface SidebarSystemFooterComponentProps {
  children: ReactNode
}

export function SidebarSystemFooterComponent({
  children
}: SidebarSystemFooterComponentProps) {
  return (
    <SidebarFooter className="border-t">
      <SidebarMenu>{children}</SidebarMenu>
    </SidebarFooter>
  )
}
