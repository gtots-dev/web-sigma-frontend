import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PutProcessingUnitsStatusMenuContentComponentProps {
  children: ReactNode
  className?: string
}

export function PutProcessingUnitsStatusMenuContentComponent({
  children,
  className
}: PutProcessingUnitsStatusMenuContentComponentProps) {
  return (
    <DrawerDialog.Content className={className}>
      {children}
    </DrawerDialog.Content>
  )
}
