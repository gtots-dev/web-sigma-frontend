import { useState } from 'react'
import type { AuthenticationFormType } from '../schemas/authentication-form.schema'
import { authenticationService } from '@/modules/authentication/infrastructure/services/authentication.service'

export function useAuthenticationFormSubmitHook() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmitSignIn = async (
    data: AuthenticationFormType
  ): Promise<void> => {
    setError(null)
    setLoading(true)

    const errorMessage = await authenticationService.signIn(data)

    if (errorMessage) setError(errorMessage)
    setLoading(false)
  }

  const onSubmitSignOut = async (): Promise<void> => {
    setLoading(true)
    await authenticationService.signOut()
    setLoading(false)
  }

  return { onSubmitSignIn, onSubmitSignOut, error, loading }
}
