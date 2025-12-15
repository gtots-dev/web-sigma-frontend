import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PostGroupSubgroupMenuContentComponentProps {
  children: ReactNode
}

export function PostGroupSubgroupMenuContentComponent({
  children
}: PostGroupSubgroupMenuContentComponentProps) {
  return <DrawerDialog.Content>{children}</DrawerDialog.Content>
}
