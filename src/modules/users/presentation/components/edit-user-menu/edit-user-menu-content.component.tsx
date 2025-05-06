import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface EditUserMenuContentComponentProps {
  children: ReactNode
}

export function EditUserMenuContentComponent({
  children
}: EditUserMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
