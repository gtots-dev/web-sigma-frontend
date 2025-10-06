'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { usePasswordResetUserMenuTrigger } from '../../hooks/use-password-reset-user-menu-trigger.hook'

export function PutUserPasswordResetMenuTriggerComponent() {
  const { loadUserPasswordResetOpenDialog } = usePasswordResetUserMenuTrigger()
  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={loadUserPasswordResetOpenDialog}
    >
      Redefinir Senha
    </Button>
  )
}
