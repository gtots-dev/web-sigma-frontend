import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface ViewMoreGroupMenuContentComponentProps {
  children: ReactNode
}

export function ViewMoreGroupMenuContentComponent({
  children
}: ViewMoreGroupMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
