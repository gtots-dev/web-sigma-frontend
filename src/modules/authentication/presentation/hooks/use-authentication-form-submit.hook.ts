import { useState } from 'react'
import type { AuthenticationFormType } from '../schemas/authentication-form.schema'
import { PATHNAMES } from '@/modules/shared/infrastructure/config/pathnames.config'
import { redirect } from 'next/navigation'
import { AuthSignInFactory } from '../../infrastructure/factories/auth-sign-in.factory'
import { AuthSignOutFactory } from '../../infrastructure/factories/auth-sign-out.factory'
import { DeleteSelectionOperationFactory } from '@/modules/operations/infrastructure/factories/delete-selection-operation-factory'

export function useAuthenticationFormSubmitHook() {
  const authSignIn = AuthSignInFactory.create()
  const deleteSelectionOperation = DeleteSelectionOperationFactory.create()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmitSignIn = async (
    data: AuthenticationFormType
  ): Promise<void> => {
    setError(null)
    setLoading(true)
    const errorMessage = await authSignIn
      .signIn(data)
      .then(() => redirect(PATHNAMES.SYSTEM))
    if (errorMessage) setError(errorMessage)
    setLoading(false)
  }

  const onSubmitSignOut = async (): Promise<void> => {
    const authSignOut = AuthSignOutFactory.create()
    setLoading(true)
    await deleteSelectionOperation.execute()
    await authSignOut.signOut().then(() => redirect(PATHNAMES.AUTHENTICATION))
    setLoading(false)
  }

  return { onSubmitSignIn, onSubmitSignOut, error, loading }
}
