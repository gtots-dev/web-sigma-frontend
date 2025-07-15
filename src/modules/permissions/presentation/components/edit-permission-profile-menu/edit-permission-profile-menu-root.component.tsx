import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'
import { useDialog } from './edit-permission-profile-menu-provider.component'

interface EditPermissionProfileMenuRootComponentProps {
  children: ReactNode
}

export function EditPermissionProfileMenuRootComponent({
  children
}: EditPermissionProfileMenuRootComponentProps) {
  const { isOpen, close } = useDialog()
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
