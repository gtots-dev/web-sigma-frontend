import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface EditLaneMenuContentComponentProps {
  children: ReactNode
}

export function EditLaneMenuContentComponent({
  children
}: EditLaneMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
