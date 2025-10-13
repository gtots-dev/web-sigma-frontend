import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'
import { useDialog } from './put-user-status-menu-provider.component'

interface PutUserStatusMenuRootComponentProps {
  children: ReactNode
}

export function PutUserStatusMenuRootComponent({
  children
}: PutUserStatusMenuRootComponentProps) {
  const { isOpen, close } = useDialog()
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
