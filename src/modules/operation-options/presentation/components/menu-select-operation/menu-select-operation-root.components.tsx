import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'

interface MenuSelectOperationRootComponentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function MenuSelectOperationRootComponent({
  open,
  onOpenChange,
  children
}: MenuSelectOperationRootComponentProps) {
  return (
    <DrawerDialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DrawerDialog.Root>
  )
}
