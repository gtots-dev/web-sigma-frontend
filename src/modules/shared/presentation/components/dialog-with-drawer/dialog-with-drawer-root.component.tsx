'use client'

import { type ReactNode } from 'react'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'
import { Dialog } from '@/modules/shared/presentation/components/shadcn/dialog'
import { Drawer } from '@/modules/shared/presentation/components/shadcn/drawer'

interface DialogWithDrawerRootComponentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function DialogWithDrawerRootComponent({
  open,
  onOpenChange,
  children
}: DialogWithDrawerRootComponentProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {children}
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {children}
    </Drawer>
  )
}
