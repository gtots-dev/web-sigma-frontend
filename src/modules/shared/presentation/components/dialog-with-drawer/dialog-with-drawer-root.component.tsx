import { useState, type ReactNode } from 'react'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'
import { Dialog } from '@/modules/shared/presentation/components/shadcn/dialog'
import { Drawer } from '@/modules/shared/presentation/components/shadcn/drawer'

interface DialogWithDrawerRootComponentProps {
  children: ReactNode
}

export function DialogWithDrawerRootComponent({
  children
}: DialogWithDrawerRootComponentProps) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {children}
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {children}
    </Drawer>
  )
}
