import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/modules/shared/presentation/components/shadcn/sidebar'
import { SidebarSystem } from '@/modules/system/presentation/components/sidebar-system'
import { UserDropdown } from '@/modules/system/presentation/components/user-dropdown'
import { type ReactNode } from 'react'
import { HeaderSystem } from '@/modules/system/presentation/components/header-system'
import { ContentSystem } from '@/modules/system/presentation/components/content-system'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'
import { auth } from '@/auth'
import { ContractSelectedLabel } from '@/modules/contracts/presentation/components/contract-selected-label'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { GetUserMeFactory } from '@/modules/users/infrastructure/factories/get-user-me.factory'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { TwoFactorChallengeProvider } from '@/modules/two-factor/presentation/contexts/two-factor-challenge.context'

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const session = await auth()
  const accessToken = session?.token?.access_token

  const isAuthenticated = Boolean(accessToken)

  if (!isAuthenticated) redirect(PATHNAMES.AUTHENTICATION)

  const jwtFactory = JwtTokenDecodeFactory.create()
  const decodedToken = jwtFactory.decode(accessToken)

  const cookieStore = await cookies()
  const hasTrustedDevice =
    cookieStore.has('trusted_device') ||
    cookieStore.has('__Secure-trusted_device')

  const requiresTwoFactor =
    decodedToken.type === '2fa_pending' && !hasTrustedDevice

  if (requiresTwoFactor) redirect(PATHNAMES.TWO_FACTOR)

  let name = ''
  let email = ''
  
  try {
    const getUserMe = GetUserMeFactory.create()
    const result = await getUserMe.execute()
    name = result.name
    email = result.email
  } catch (error) {
    if (error instanceof HttpResponseError && error.message.includes('Two-factor authentication not completed')) {
      redirect(PATHNAMES.TWO_FACTOR)
    }
    throw error
  }

  const permissions = decodedToken.permissions

  const user = { name, email }
  const userWithRole = { ...user, isAdmin: session.user.isAdmin }

  return (
    <TwoFactorChallengeProvider>
      <SidebarProvider>
        <SidebarSystem.Client user={userWithRole} permissions={permissions} />

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
                  user={user}
                />
                <UserDropdown.Menu align="end" side="bottom" user={user} />
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
