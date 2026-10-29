import { type ReactNode } from 'react'
import { SystemErrorState } from '@/modules/system/presentation/components/system-error-state/system-error-state.component'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/modules/shared/presentation/components/shadcn/sidebar'
import { SidebarSystem } from '@/modules/system/presentation/components/sidebar-system'
import { UserDropdown } from '@/modules/system/presentation/components/user-dropdown'
import { getSystemLayoutContext } from '@/modules/system/presentation/utils/get-system-layout-context.util'
import { HeaderSystem } from '@/modules/system/presentation/components/header-system'
import { ContentSystem } from '@/modules/system/presentation/components/content-system'
import { ContractSelectedLabel } from '@/modules/contracts/presentation/components/contract-selected-label'
import { TwoFactorChallengeProvider } from '@/modules/two-factor/presentation/contexts/two-factor-challenge.context'
import { RouteTracker } from '@/modules/system/presentation/components/route-tracker/route-tracker.component'

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const context = await getSystemLayoutContext()

  if (context.state === 'error')
    return <SystemErrorState variant={context.variant} />

  return (
    <TwoFactorChallengeProvider>
      <RouteTracker />
      <SidebarProvider>
        <SidebarSystem.Client
          user={context.userWithRole}
          permissions={context.permissions}
        />

        <SidebarInset>
          <HeaderSystem.Root>
            <div className="flex items-center gap-x-2">
              <SidebarTrigger className="h-12 w-12 aspect-square" />
              <Separator orientation="vertical" className="h-9" />
            </div>
            <div className="sm:hidden order-3">
              <UserDropdown.Root>
                <UserDropdown.Trigger
                  className="ms-auto h-auto w-auto aspect-square"
                  isInfoEnabled={false}
                  user={context.user}
                />
                <UserDropdown.Menu
                  align="end"
                  side="bottom"
                  user={context.user}
                />
              </UserDropdown.Root>
            </div>
            <ContractSelectedLabel.Button />
          </HeaderSystem.Root>
          <ContentSystem.Root>{children}</ContentSystem.Root>
        </SidebarInset>
      </SidebarProvider>
    </TwoFactorChallengeProvider>
  )
}
