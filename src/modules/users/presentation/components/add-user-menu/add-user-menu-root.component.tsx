import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'
import { useDialog } from './add-user-menu-provider.component'

interface AddUserMenuRootComponentProps {
  children: ReactNode
}

export function AddUserMenuRootComponent({
  children
}: AddUserMenuRootComponentProps) {
  const { isOpen, close } = useDialog()
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
