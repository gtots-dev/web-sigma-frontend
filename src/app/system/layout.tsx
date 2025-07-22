import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/modules/shared/presentation/components/shadcn/sidebar'
import { SidebarData } from '@/modules/system/infrastructure/configs/sidebar.config'
import { SidebarSystem } from '@/modules/system/presentation/components/sidebar-system'
import { UserDropdown } from '@/modules/system/presentation/components/user-dropdown'
import type { ReactNode } from 'react'
import { HeaderSystem } from '@/modules/system/presentation/components/header-system'
import { ContentSystem } from '@/modules/system/presentation/components/content-system'
import { getUserMe } from '@/modules/users/presentation/utils/get-user.util'

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const { name, email } = await getUserMe()
  return (
    <SidebarProvider>
      <SidebarSystem.Root>
        <SidebarSystem.Header />
        <SidebarSystem.Content>
          <SidebarSystem.Item item={SidebarData} />
        </SidebarSystem.Content>
        <SidebarSystem.Footer>
          <UserDropdown.Root>
            <UserDropdown.Trigger user={{ name, email }} />
            <UserDropdown.Menu user={{ name, email }} />
          </UserDropdown.Root>
        </SidebarSystem.Footer>
      </SidebarSystem.Root>

      <SidebarInset>
        <HeaderSystem.Root>
          <div className="flex items-center gap-x-2">
            <SidebarTrigger className="h-12 w-12 aspect-square" />
            <Separator orientation="vertical" className="h-9" />
          </div>
          <div className="sm:hidden">
            <UserDropdown.Root>
              <UserDropdown.Trigger
                className="ms-auto h-auto w-auto aspect-square"
                isInfoEnabled={false}
                user={{ name, email }}
              />
              <UserDropdown.Menu
                align="end"
                side="bottom"
                user={{ name, email }}
              />
            </UserDropdown.Root>
          </div>
        </HeaderSystem.Root>
        <ContentSystem.Root>{children}</ContentSystem.Root>
      </SidebarInset>
    </SidebarProvider>
  )
}
