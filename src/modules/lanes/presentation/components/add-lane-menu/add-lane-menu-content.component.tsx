import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface AddLaneMenuContentComponentProps {
  children: ReactNode
}

export function AddLaneMenuContentComponent({
  children
}: AddLaneMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
