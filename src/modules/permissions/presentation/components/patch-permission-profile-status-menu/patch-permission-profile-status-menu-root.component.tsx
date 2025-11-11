import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'
import { useDialog } from './patch-permission-profile-status-menu-provider.component'

interface PatchPermissionProfileStatusMenuRootComponentProps {
  children: ReactNode
}

export function PatchPermissionProfileStatusMenuRootComponent({
  children
}: PatchPermissionProfileStatusMenuRootComponentProps) {
  const { isOpen, close } = useDialog()
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
