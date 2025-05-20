import type { ReactNode } from 'react'
import { DialogTrigger } from '@/modules/shared/presentation/components/shadcn/dialog'
import { DrawerTrigger } from '@/modules/shared/presentation/components/shadcn/drawer'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'

interface DialogWithDrawerTriggerComponentProps {
  children: ReactNode
}

export function DialogWithDrawerTriggerComponent({
  children
}: DialogWithDrawerTriggerComponentProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <DialogTrigger
        asChild
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {children}
      </DialogTrigger>
    )
  }

  return <DrawerTrigger asChild>{children}</DrawerTrigger>
}
