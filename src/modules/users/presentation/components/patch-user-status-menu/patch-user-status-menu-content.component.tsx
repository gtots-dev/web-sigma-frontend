import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PatchUserStatusMenuContentComponentProps {
  children: ReactNode
  className?: string
}

export function PatchUserStatusMenuContentComponent({
  children,
  className
}: PatchUserStatusMenuContentComponentProps) {
  return (
    <DrawerDialog.Content className={className}>
      {children}
    </DrawerDialog.Content>
  )
}
