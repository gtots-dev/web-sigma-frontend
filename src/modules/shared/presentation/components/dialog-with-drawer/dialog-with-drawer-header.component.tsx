import type { ReactNode } from 'react'
import { DialogHeader } from '@/modules/shared/presentation/components/shadcn/dialog'
import { DrawerHeader } from '@/modules/shared/presentation/components/shadcn/drawer'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'

interface DialogWithDrawerHeaderComponentProps {
  children: ReactNode
}

export function DialogWithDrawerHeaderComponent({
  children
}: DialogWithDrawerHeaderComponentProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <DialogHeader className="h-[160px] border-b p-8">{children}</DialogHeader>
    )
  }

  return <DrawerHeader className="text-left">{children}</DrawerHeader>
}
