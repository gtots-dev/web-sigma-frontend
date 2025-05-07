import type { ReactNode } from 'react'
import { DialogDescription } from '@/modules/shared/presentation/components/shadcn/dialog'
import { DrawerDescription } from '@/modules/shared/presentation/components/shadcn/drawer'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'

interface DialogWithDrawerDescriptionComponentProps {
  children: ReactNode
}

export function DialogWithDrawerDescriptionComponent({
  children
}: DialogWithDrawerDescriptionComponentProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return <DialogDescription className='text-[1.05rem]'>{children}</DialogDescription>
  }

  return <DrawerDescription className="text-[1rem] text-left mb-3 sm:mb-0">{children}</DrawerDescription>
}
