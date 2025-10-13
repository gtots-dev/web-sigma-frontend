import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface EditContractMenuContentComponentProps {
  children: ReactNode
}

export function EditContractMenuContentComponent({
  children
}: EditContractMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
