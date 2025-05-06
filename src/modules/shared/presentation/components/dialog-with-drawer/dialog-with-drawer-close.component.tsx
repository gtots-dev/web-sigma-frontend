import type { ReactNode } from 'react'
import { DialogClose } from '@/modules/shared/presentation/components/shadcn/dialog'
import { DrawerClose } from '@/modules/shared/presentation/components/shadcn/drawer'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'
import type { DialogCloseProps } from '@radix-ui/react-dialog'

interface DialogWithDrawerCloseComponentProps extends DialogCloseProps {
  children: ReactNode
}

export function DialogWithDrawerCloseComponent({
  children,
  ...props
}: DialogWithDrawerCloseComponentProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return <DialogClose {...props} asChild>{children}</DialogClose>
  }

  return <DrawerClose {...props} asChild>{children}</DrawerClose>
}
