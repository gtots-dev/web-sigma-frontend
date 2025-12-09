import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PostGroupLaneMenuContentComponentProps {
  children: ReactNode
}

export function PostGroupLaneMenuContentComponent({
  children
}: PostGroupLaneMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
