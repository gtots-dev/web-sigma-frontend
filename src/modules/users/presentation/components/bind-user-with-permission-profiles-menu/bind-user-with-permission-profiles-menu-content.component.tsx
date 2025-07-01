import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface BindUserWithPermissionProfilesMenuContentComponentProps {
  children: ReactNode
}

export function BindUserWithPermissionProfilesMenuContentComponent({
  children
}: BindUserWithPermissionProfilesMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
