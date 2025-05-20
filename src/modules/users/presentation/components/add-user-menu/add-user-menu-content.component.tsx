import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface AddUserMenuContentComponentProps {
  children: ReactNode
}

export function AddUserMenuContentComponent({
  children
}: AddUserMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
