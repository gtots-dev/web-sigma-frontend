'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useAuthenticationFormSubmitHook } from '@/modules/authentication/presentation/hooks/use-authentication-form-submit.hook'

export function TwoFactorFormCancelComponent() {
  const { onSubmitSignOut, loading } = useAuthenticationFormSubmitHook()

  return (
    <Button
      type="button"
      variant="ghost"
      className="w-full text-sm text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-50 border-1 hover:bg-transparent hover:border"
      disabled={loading}
      onClick={onSubmitSignOut}
    >
      Voltar para login
    </Button>
  )
}
