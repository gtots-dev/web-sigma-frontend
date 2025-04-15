import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import type { ReactNode } from 'react'

interface MenuSelectOperationFooterComponentProps {
  children: ReactNode
}

export function MenuSelectOperationFooterComponent({
  children
}: MenuSelectOperationFooterComponentProps) {
  return (
    <div className="flex w-full justify-end gap-x-5">
      <DrawerDialog.Close>
        <Button className="w-[150px]">Cancelar</Button>
      </DrawerDialog.Close>
      <DrawerDialog.Close>{children}</DrawerDialog.Close>
    </div>
  )
}
