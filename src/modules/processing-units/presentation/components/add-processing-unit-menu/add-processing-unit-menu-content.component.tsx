import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface AddProcessingUnitMenuContentComponentProps {
  children: ReactNode
}

export function AddProcessingUnitMenuContentComponent({
  children
}: AddProcessingUnitMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
