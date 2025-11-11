import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PatchLaneStatusMenuContentComponentProps {
  children: ReactNode
  className?: string
}

export function PatchLaneStatusMenuContentComponent({
  children,
  className
}: PatchLaneStatusMenuContentComponentProps) {
  return (
    <DrawerDialog.Content className={className}>
      {children}
    </DrawerDialog.Content>
  )
}
