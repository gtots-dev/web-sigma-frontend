import type { ReactNode } from 'react'
import { DialogTitle } from '@/modules/shared/presentation/components/shadcn/dialog'
import { DrawerTitle } from '@/modules/shared/presentation/components/shadcn/drawer'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'

interface DialogWithDrawerTitleComponentProps {
  children: ReactNode
}

export function DialogWithDrawerTitleComponent({
  children
}: DialogWithDrawerTitleComponentProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return <DialogTitle className='text-[2.5rem]'>{children}</DialogTitle>
  }

  return <DrawerTitle className="font-medium text-[1.7rem] text-left">{children}</DrawerTitle>
}
