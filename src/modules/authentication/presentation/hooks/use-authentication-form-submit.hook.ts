'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { AuthenticationFormType } from '../schemas/authentication-form.schema'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { AuthSignInFactory } from '../../infrastructure/factories/auth-sign-in.factory'
import { AuthSignOutFactory } from '../../infrastructure/factories/auth-sign-out.factory'
import { getSession } from 'next-auth/react'
import type { Session } from 'next-auth'
import { useTwoFactorStore } from '@/modules/two-factor/presentation/stores/two-factor.store'

export function useAuthenticationFormSubmitHook() {
  const router = useRouter()
  const { postTwoFactor } = useTwoFactorStore()
  const authSignIn = AuthSignInFactory.create()
  const authSignOut = AuthSignOutFactory.create()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmitSignIn = async (
    data: AuthenticationFormType
  ): Promise<void> => {
    setError(null)
    setLoading(true)
    try {
      await authSignIn.signIn(data)
      const session = await getSession()
      if (!session) throw new Error('Sessão não encontrada')
      if ((session as Session).authType === '2fa_pending') {
        await postTwoFactor()
        router.push(PATHNAMES.TWO_FACTOR)
        return
      }
      router.push(PATHNAMES.SYSTEM)
    } catch (err) {
      if (err instanceof Error) setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  const onSubmitSignOut = async (): Promise<void> => {
    setLoading(true)
    try {
      await authSignOut.signOut()
      router.push(PATHNAMES.AUTHENTICATION)
    } finally {
      setLoading(false)
    }
  }

  return { onSubmitSignIn, onSubmitSignOut, error, loading }
}
