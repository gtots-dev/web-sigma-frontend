import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'

interface PatchContractMenuContentComponentProps {
  children: ReactNode
}

export function PatchContractMenuContentComponent({
  children
}: PatchContractMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
