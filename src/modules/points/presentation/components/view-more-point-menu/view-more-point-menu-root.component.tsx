'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { type ReactNode } from 'react'

interface ViewMorePointMenuRootComponentProps {
  children: ReactNode
  isOpen: boolean
  close: () => void
}

export function ViewMorePointMenuRootComponent({
  children,
  isOpen,
  close
}: ViewMorePointMenuRootComponentProps) {
  return (
    <DrawerDialog.Root open={isOpen} onOpenChange={close}>
      {children}
    </DrawerDialog.Root>
  )
}
