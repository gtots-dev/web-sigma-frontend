import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PutUserPasswordResetMenuContentComponentProps {
  children: ReactNode
  className?: string
}

export function PutUserPasswordResetMenuContentComponent({
  children,
  className
}: PutUserPasswordResetMenuContentComponentProps) {
  return (
    <DrawerDialog.Content className={className}>
      {children}
    </DrawerDialog.Content>
  )
}
