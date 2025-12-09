'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface ViewMoreGroupMenuRootComponentProps {
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function ViewMoreGroupMenuRootComponent({
  children,
  isOpen,
  close
}: ViewMoreGroupMenuRootComponentProps) {
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
