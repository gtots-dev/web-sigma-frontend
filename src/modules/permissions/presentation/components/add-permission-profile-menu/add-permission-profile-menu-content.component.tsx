import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface AddPermissionProfileMenuContentComponentProps {
  children: ReactNode
}

export function AddPermissionProfileMenuContentComponent({
  children
}: AddPermissionProfileMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
