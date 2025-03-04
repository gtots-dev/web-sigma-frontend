import { signIn, signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { MESSAGES_AUTHENTICATION } from '@/modules/shared/presentation/messages/authentication'
import type { AuthenticationFormType } from '@/modules/authentication/presentation/schemas/authentication-form.schema'
import { PATHNAMES } from '../config/pathnames.config'

export const authenticationService = {
  async signIn(data: AuthenticationFormType): Promise<string | null> {
    const { code, error } = await signIn('credentials', {
      ...data,
      redirect: false
    })

    if (error) return authenticationService.getErrorMessage(code)
    redirect(PATHNAMES.SYSTEM)
  },

  async signOut(): Promise<void> {
    await signOut({ redirect: false })
    redirect(PATHNAMES.AUTHENTICATION)
  },

  getErrorMessage(code: string): string | null {
    const errorsMap: Record<string, string> = {
      '401': MESSAGES_AUTHENTICATION['1.5'],
      '500': MESSAGES_AUTHENTICATION['1.14']
    }
    return errorsMap[code] ?? null
  }
}
