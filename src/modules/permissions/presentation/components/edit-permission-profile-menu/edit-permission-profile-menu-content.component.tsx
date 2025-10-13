import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface EditPermissionProfileMenuContentComponentProps {
  children: ReactNode
}

export function EditPermissionProfileMenuContentComponent({
  children
}: EditPermissionProfileMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
