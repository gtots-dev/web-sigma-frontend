'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './put-user-password-reset-menu-provider.component'

export function PutUserPasswordResetMenuTriggerComponent() {
  const { open } = useDialog()
  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={open}
    >
      Redefinir Senha
    </Button>
  )
}
