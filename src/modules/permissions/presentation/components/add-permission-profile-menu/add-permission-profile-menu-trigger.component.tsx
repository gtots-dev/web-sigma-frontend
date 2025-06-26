'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Shield } from 'lucide-react'
import { useDialog } from './add-permission-profile-menu-provider.component'

export function AddPermissionProfileMenuTriggerComponent() {
  const { open } = useDialog()
  return (
    <Button variant="primary" className="w-full sm:w-auto" onClick={open}>
      <Shield />
      <span className="truncate">Adicionar Perfil</span>
    </Button>
  )
}
