import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'
import { useDialog } from './add-permission-profile-menu-provider.component'

interface AddPermissionProfileMenuRootComponentProps {
  children: ReactNode
}

export function AddPermissionProfileMenuRootComponent({
  children
}: AddPermissionProfileMenuRootComponentProps) {
  const { isOpen, close } = useDialog()
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
