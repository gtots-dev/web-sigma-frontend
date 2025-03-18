'use client'

import { useAuthenticationFormSubmitHook } from '@/modules/authentication/presentation/hooks/use-authentication-form-submit.hook'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { LoaderCircle, LogOut } from 'lucide-react'

export function DeauthenticationButton() {
  const { onSubmitSignOut, loading } = useAuthenticationFormSubmitHook()
  return (
    <Button
      disabled={loading}
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={() => onSubmitSignOut()}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : <LogOut />}
      Sair
    </Button>
  )
}
