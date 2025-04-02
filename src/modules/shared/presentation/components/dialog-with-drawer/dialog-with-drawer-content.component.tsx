import type { ReactNode } from 'react'
import { DialogContent } from '@/modules/shared/presentation/components/shadcn/dialog'
import { DrawerContent } from '@/modules/shared/presentation/components/shadcn/drawer'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'

interface DialogWithDrawerContentComponentProps {
  children: ReactNode
}

export function DialogWithDrawerContentComponent({
  children
}: DialogWithDrawerContentComponentProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <DialogContent className="flex flex-col p-0 gap-0 !rounded-2xl h-[85vh] sm:max-w-[90vw] lg:max-w-[768px] xl:max-w-[862px]">
        {children}
      </DialogContent>
    )
  }

  return <DrawerContent className='p-5'>{children}</DrawerContent>
}
