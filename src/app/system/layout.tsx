import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/modules/shared/presentation/components/shadcn/sidebar'
import { SidebarSystem } from '@/modules/system/presentation/components/sidebar-system'
import { UserDropdown } from '@/modules/system/presentation/components/user-dropdown'
import type { ReactNode } from 'react'
import { HeaderSystem } from '@/modules/system/presentation/components/header-system'
import { ContentSystem } from '@/modules/system/presentation/components/content-system'
import { getUserMe } from '@/modules/users/presentation/utils/get-user.util'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'
import { auth } from '@/auth'
interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const jwtFactory = JwtTokenDecodeFactory.create()
  const { token: JWT } = await auth()
  const { permissions } = jwtFactory.decode(JWT.access_token)
  const { name, email } = await getUserMe()

  return (
    <SidebarProvider>
      <SidebarSystem.Client user={{ name, email }} permissions={permissions} />

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
