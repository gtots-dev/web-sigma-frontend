import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface AddContractMenuContentComponentProps {
  children: ReactNode
}

export function AddContractMenuContentComponent({
  children
}: AddContractMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
