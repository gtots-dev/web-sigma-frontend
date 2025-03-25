import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/modules/shared/presentation/components/shadcn/sidebar'
import { SidebarData } from '@/test/mocks/sidebar-data.mock'
import { SidebarSystem } from '@/modules/system/presentation/components/sidebar-system'
import { UserDropdown } from '@/modules/system/presentation/components/user-dropdown'
import type { ReactNode } from 'react'
import { HeaderSystem } from '@/modules/system/presentation/components/header-system'
import { ContentSystem } from '@/modules/system/presentation/components/content-system'
import { useJwtInfo } from '@/modules/system/presentation/hooks/use-jwt-Info.hook'

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const { sub } = await useJwtInfo()
  return (
    <SidebarProvider>
      <SidebarSystem.Root>
        <SidebarSystem.Header />
        <SidebarSystem.Content>
          <SidebarSystem.Item item={SidebarData} />
        </SidebarSystem.Content>
        <SidebarSystem.Footer>
          <UserDropdown.Root>
            <UserDropdown.Trigger
              user={{
                name: sub,
                email: ''
              }}
            />
            <UserDropdown.Menu
              user={{
                name: sub,
                email: ''
              }}
            />
          </UserDropdown.Root>
        </SidebarSystem.Footer>
      </SidebarSystem.Root>

      <SidebarInset>
        <HeaderSystem.Root>
          <SidebarTrigger className="h-12 w-12 aspect-square" />
          <Separator orientation="vertical" className="h-9" />
        </HeaderSystem.Root>
        <ContentSystem.Root>{children}</ContentSystem.Root>
      </SidebarInset>
    </SidebarProvider>
  )
}
