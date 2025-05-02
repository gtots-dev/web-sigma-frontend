'use client'

import { useAuthenticationFormSubmitHook } from '@/modules/authentication/presentation/hooks/use-authentication-form-submit.hook'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { LoaderCircle, LogOut } from 'lucide-react'

export function DeauthenticationButton() {
  const { onSubmitSignOut, loading } = useAuthenticationFormSubmitHook()
  return (
    <Button
      disabled={loading}
      className="bg-primary-600 text-zinc-50 hover:bg-primary-600/90"
      onClick={() => onSubmitSignOut()}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : <LogOut />}
      Sair
    </Button>
  )
}
