import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PostPointMenuContentComponentProps {
  children: ReactNode
}

export function PostPointMenuContentComponent({
  children
}: PostPointMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
