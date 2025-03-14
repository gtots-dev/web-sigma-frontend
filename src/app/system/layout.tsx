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
import { HeaderSystem } from '@/modules/system/presentation/components/header-system'
import { ContentSystem } from '@/modules/system/presentation/components/content-system'

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
        <HeaderSystem.Root>
          <SidebarTrigger className="h-12 w-12 aspect-square" />
          <Separator orientation="vertical" className="h-9" />
        </HeaderSystem.Root>
        <ContentSystem.Root>
          {children}
        </ContentSystem.Root>
      </SidebarInset>
    </SidebarProvider>
  )
}
