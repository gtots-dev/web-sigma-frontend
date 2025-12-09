import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PatchGroupStatusMenuContentComponentProps {
  children: ReactNode
  className?: string
}

export function PatchGroupStatusMenuContentComponent({
  children,
  className
}: PatchGroupStatusMenuContentComponentProps) {
  return (
    <DrawerDialog.Content className={className}>
      {children}
    </DrawerDialog.Content>
  )
}
