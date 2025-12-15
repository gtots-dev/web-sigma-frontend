import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PostGroupMenuContentComponentProps {
  children: ReactNode
}

export function PostGroupMenuContentComponent({
  children
}: PostGroupMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
