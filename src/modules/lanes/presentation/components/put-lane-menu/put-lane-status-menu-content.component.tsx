import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PutLaneStatusMenuContentComponentProps {
  children: ReactNode
  className?: string
}

export function PutLaneStatusMenuContentComponent({
  children,
  className
}: PutLaneStatusMenuContentComponentProps) {
  return (
    <DrawerDialog.Content className={className}>
      {children}
    </DrawerDialog.Content>
  )
}
