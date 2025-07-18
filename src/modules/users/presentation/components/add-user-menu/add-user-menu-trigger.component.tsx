'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { UserRoundPlus } from 'lucide-react'
import { useDialog } from './add-user-menu-provider.component'

export function AddUserMenuTriggerComponent() {
  const { open } = useDialog()
  return (
    <Button variant="primary" className="w-full sm:w-auto" onClick={open}>
      <UserRoundPlus />
      <span className="truncate">Adicionar usuário</span>
    </Button>
  )
}
