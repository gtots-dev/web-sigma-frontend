import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'
import { useDialog } from './put-permission-profile-status-menu-provider.component'

interface PutPermissionProfileStatusMenuRootComponentProps {
  children: ReactNode
}

export function PutPermissionProfileStatusMenuRootComponent({
  children
}: PutPermissionProfileStatusMenuRootComponentProps) {
  const { isOpen, close } = useDialog()
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
