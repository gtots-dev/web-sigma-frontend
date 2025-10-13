import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import type { ReactNode } from 'react'
import { useDialog } from './edit-contract-menu-provider.component'

interface EditContractMenuRootComponentProps {
  children: ReactNode
}

export function EditContractMenuRootComponent({
  children
}: EditContractMenuRootComponentProps) {
  const { isOpen, close } = useDialog()
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
