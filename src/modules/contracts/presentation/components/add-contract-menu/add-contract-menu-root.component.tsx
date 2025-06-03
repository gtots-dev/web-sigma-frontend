import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'
import { useDialog } from './add-contract-menu-provider.component'

interface AddContractMenuRootComponentProps {
  children: ReactNode
}

export function AddContractMenuRootComponent({
  children
}: AddContractMenuRootComponentProps) {
  const { isOpen, close } = useDialog()
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
