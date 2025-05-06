import { useState } from 'react'
import type { AuthenticationFormType } from '../schemas/authentication-form.schema'
import { PATHNAMES } from '@/modules/shared/infrastructure/config/pathnames.config'
import { redirect } from 'next/navigation'
import { AuthSignInFactory } from '../../infrastructure/factories/auth-sign-in.factory'
import { AuthSignOutFactory } from '../../infrastructure/factories/auth-sign-out.factory'

export function useAuthenticationFormSubmitHook() {
  const authSignIn = AuthSignInFactory.create()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmitSignIn = async (
    data: AuthenticationFormType
  ): Promise<void> => {
    setError(null)
    setLoading(true)
    const errorMessage = await authSignIn.signIn(data)
    if (errorMessage) setError(errorMessage)
    setLoading(false)
    redirect(PATHNAMES.SYSTEM)
  }

  const onSubmitSignOut = (): Promise<void> => {
    const authSignOut = AuthSignOutFactory.create()
    setLoading(true)
    authSignOut.signOut()
    setLoading(false)
    redirect(PATHNAMES.AUTHENTICATION)
  }

  return { onSubmitSignIn, onSubmitSignOut, error, loading }
}
