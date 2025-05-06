import type { ComponentProps, ReactNode } from 'react'
import {
  Sidebar,
  SidebarRail
} from '@/modules/shared/presentation/components/shadcn/sidebar'

interface SidebarSystemRootComponentProps
  extends ComponentProps<typeof Sidebar> {
  children: ReactNode
}

export function SidebarSystemRootComponent({
  children,
  ...props
}: SidebarSystemRootComponentProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {children}
      <SidebarRail />
    </Sidebar>
  )
}
