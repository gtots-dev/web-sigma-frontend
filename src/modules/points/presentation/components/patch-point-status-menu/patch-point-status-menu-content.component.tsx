import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PatchPointStatusMenuContentComponentProps {
  children: ReactNode
  className?: string
}

export function PatchPointStatusMenuContentComponent({
  children,
  className
}: PatchPointStatusMenuContentComponentProps) {
  return (
    <DrawerDialog.Content className={className}>
      {children}
    </DrawerDialog.Content>
  )
}
