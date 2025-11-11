import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PatchPermissionProfileStatusMenuContentComponentProps {
  children: ReactNode
  className?: string
}

export function PatchPermissionProfileStatusMenuContentComponent({
  children,
  className
}: PatchPermissionProfileStatusMenuContentComponentProps) {
  return (
    <DrawerDialog.Content className={className}>
      {children}
    </DrawerDialog.Content>
  )
}
