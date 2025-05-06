import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'
import { useDialog } from './edit-user-menu-provider.component'

interface EditUserMenuRootComponentProps {
  children: ReactNode
}

export function EditUserMenuRootComponent({
  children
}: EditUserMenuRootComponentProps) {
  const { isOpen, close } = useDialog()
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
