import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface ViewMoreUserMenuContentComponentProps {
  children: ReactNode
}

export function ViewMoreUserMenuContentComponent({
  children
}: ViewMoreUserMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
