import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/modules/shared/presentation/components/shadcn/sidebar'
import { SidebarData } from '@/test/mocks/sidebar-data.mock'
import { UserDataAccount } from '@/test/mocks/user-data.mock'
import { SidebarSystem } from '@/modules/system/presentation/components/sidebar-system'
import { UserDropdown } from '@/modules/system/presentation/components/user-dropdown'
import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <SidebarSystem.Root>
        <SidebarSystem.Header />
        <SidebarSystem.Content>
          <SidebarSystem.Item item={SidebarData} />
        </SidebarSystem.Content>
        <SidebarSystem.Footer>
          <UserDropdown.Root>
            <UserDropdown.Trigger user={UserDataAccount} />
            <UserDropdown.Menu user={UserDataAccount} />
          </UserDropdown.Root>
        </SidebarSystem.Footer>
      </SidebarSystem.Root>

      <SidebarInset>
        <header className="flex h-16 border-b shrink-0 items-center gap-2 px-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="h-12 w-12 aspect-square" />
          </div>
          <Separator orientation="vertical" className="h-9" />
        </header>
        <div className="flex flex-1 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
