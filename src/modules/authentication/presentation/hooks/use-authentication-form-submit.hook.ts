'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { AuthenticationFormType } from '../schemas/authentication-form.schema'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { AuthSignInFactory } from '../../infrastructure/factories/auth-sign-in.factory'
import { AuthSignOutFactory } from '../../infrastructure/factories/auth-sign-out.factory'
import { DeleteSelectionOperationFactory } from '@/modules/operations/infrastructure/factories/delete-selection-operation-factory'

export function useAuthenticationFormSubmitHook() {
  const router = useRouter()
  const authSignIn = AuthSignInFactory.create()
  const authSignOut = AuthSignOutFactory.create()
  const deleteSelectionOperation = DeleteSelectionOperationFactory.create()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmitSignIn = async (
    data: AuthenticationFormType
  ): Promise<void> => {
    setError(null)
    setLoading(true)
    try {
      await authSignIn.signIn(data)
      router.push(PATHNAMES.SYSTEM)
    } catch (errorMessage) {
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const onSubmitSignOut = async (): Promise<void> => {
    setLoading(true)
    try {
      await deleteSelectionOperation.execute()
      await authSignOut.signOut()
      router.push(PATHNAMES.AUTHENTICATION)
    } finally {
      setLoading(false)
    }
  }

  return { onSubmitSignIn, onSubmitSignOut, error, loading }
}
