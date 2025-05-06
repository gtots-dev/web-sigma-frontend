import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'
import { useDialog } from './view-more-user-menu-provider.component'

interface ViewMoreUserMenuRootComponentProps {
  children: ReactNode
}

export function ViewMoreUserMenuRootComponent({
  children
}: ViewMoreUserMenuRootComponentProps) {
  const { isOpen, close } = useDialog()
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
