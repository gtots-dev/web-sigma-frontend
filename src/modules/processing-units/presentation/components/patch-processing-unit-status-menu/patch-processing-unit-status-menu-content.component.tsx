import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface PatchProcessingUnitsStatusMenuContentComponentProps {
  children: ReactNode
  className?: string
}

export function PatchProcessingUnitsStatusMenuContentComponent({
  children,
  className
}: PatchProcessingUnitsStatusMenuContentComponentProps) {
  return (
    <DrawerDialog.Content className={className}>
      {children}
    </DrawerDialog.Content>
  )
}
