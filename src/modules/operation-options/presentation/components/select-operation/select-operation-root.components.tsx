import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'

interface SelectOperationRootComponentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function SelectOperationRootComponent({
  open,
  onOpenChange,
  children
}: SelectOperationRootComponentProps) {
  return (
    <DrawerDialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DrawerDialog.Root>
  )
}
