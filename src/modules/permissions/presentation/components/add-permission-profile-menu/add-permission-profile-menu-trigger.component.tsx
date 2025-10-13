'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Shield } from 'lucide-react'
import { useAddPermissionProfileMenuTrigger } from '../../hooks/use-add-permission-profile-menu-trigger.hook'

export function AddPermissionProfileMenuTriggerComponent() {
  const { loadPermissionProfileAddOpenDialog } =
    useAddPermissionProfileMenuTrigger()

  return (
    <Button
      variant="primary"
      className="w-full sm:w-auto"
      onClick={loadPermissionProfileAddOpenDialog}
    >
      <Shield />
      <span className="truncate">Adicionar Perfil</span>
    </Button>
  )
}
