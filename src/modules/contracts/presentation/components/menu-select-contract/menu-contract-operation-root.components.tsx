import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'

interface MenuSelectContractRootComponentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function MenuSelectContractRootComponent({
  open,
  onOpenChange,
  children
}: MenuSelectContractRootComponentProps) {
  return (
    <DrawerDialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DrawerDialog.Root>
  )
}
