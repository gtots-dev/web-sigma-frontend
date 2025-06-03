import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'
import { useDialog } from './put-user-password-reset-menu-provider.component'

interface PutUserPasswordResetMenuRootComponentProps {
  children: ReactNode
}

export function PutUserPasswordResetMenuRootComponent({
  children
}: PutUserPasswordResetMenuRootComponentProps) {
  const { isOpen, close } = useDialog()
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
