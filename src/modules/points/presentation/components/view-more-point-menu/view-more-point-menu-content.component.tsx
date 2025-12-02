import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface ViewMorePointMenuContentComponentProps {
  children: ReactNode
}

export function ViewMorePointMenuContentComponent({
  children
}: ViewMorePointMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
