import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface EditProcessingUnitsMenuContentComponentProps {
  children: ReactNode
}

export function EditProcessingUnitsMenuContentComponent({
  children
}: EditProcessingUnitsMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
