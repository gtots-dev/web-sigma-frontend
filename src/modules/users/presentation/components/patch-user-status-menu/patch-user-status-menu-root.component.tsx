import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'
import { useDialog } from './patch-user-status-menu-provider.component'

interface PatchUserStatusMenuRootComponentProps {
  children: ReactNode
}

export function PatchUserStatusMenuRootComponent({
  children
}: PatchUserStatusMenuRootComponentProps) {
  const { isOpen, close } = useDialog()
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
