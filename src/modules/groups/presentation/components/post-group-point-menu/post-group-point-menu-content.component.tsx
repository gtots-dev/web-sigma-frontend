import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PostGroupPointMenuContentComponentProps {
  children: ReactNode
}

export function PostGroupPointMenuContentComponent({
  children
}: PostGroupPointMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
