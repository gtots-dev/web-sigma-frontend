import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface AddUserFilesMenuContentComponentProps {
  children: ReactNode
  className?: string
}

export function AddUserFilesMenuContentComponent({
  children,
  className
}: AddUserFilesMenuContentComponentProps) {
  return (
    <DrawerDialog.Content className={className}>
      {children}
    </DrawerDialog.Content>
  )
}
