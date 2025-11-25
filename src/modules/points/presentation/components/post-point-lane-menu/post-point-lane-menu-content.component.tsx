import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PostPointLaneMenuContentComponentProps {
  children: ReactNode
}

export function PostPointLaneMenuContentComponent({
  children
}: PostPointLaneMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
