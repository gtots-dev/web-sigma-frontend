import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'
import { useDialog } from './bind-user-with-permission-profiles-menu-provider.component'

interface BindUserWithPermissionProfilesMenuRootComponentProps {
  children: ReactNode
}

export function BindUserWithPermissionProfilesMenuRootComponent({
  children
}: BindUserWithPermissionProfilesMenuRootComponentProps) {
  const { isOpen, close } = useDialog()
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
