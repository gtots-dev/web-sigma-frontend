'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { UserRoundPlus } from 'lucide-react'
import { useAddUserMenuTrigger } from '../../hooks/use-post-user-menu-trigger.hook'

export function AddUserMenuTriggerComponent() {
  const { loadUserAddOpenDialog } = useAddUserMenuTrigger()
  return (
    <Button
      variant="primary"
      className="w-full sm:w-auto"
      onClick={loadUserAddOpenDialog}
    >
      <UserRoundPlus />
      <span className="truncate">Adicionar usuário</span>
    </Button>
  )
}
