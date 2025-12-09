import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PatchGroupMenuContentComponentProps {
  children: ReactNode
}

export function PatchGroupMenuContentComponent({
  children
}: PatchGroupMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
