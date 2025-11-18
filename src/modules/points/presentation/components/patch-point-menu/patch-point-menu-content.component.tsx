import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PatchPointMenuContentComponentProps {
  children: ReactNode
}

export function PatchPointMenuContentComponent({
  children
}: PatchPointMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
