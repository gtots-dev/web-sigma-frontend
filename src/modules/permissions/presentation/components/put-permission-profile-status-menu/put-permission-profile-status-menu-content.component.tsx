import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PutPermissionProfileStatusMenuContentComponentProps {
  children: ReactNode
  className?: string
}

export function PutPermissionProfileStatusMenuContentComponent({
  children,
  className
}: PutPermissionProfileStatusMenuContentComponentProps) {
  return (
    <DrawerDialog.Content className={className}>
      {children}
    </DrawerDialog.Content>
  )
}
