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
    <div className="flex flex-col-reverse sm:flex-row w-full justify-end gap-5 px-5 sm:px-10 sm:pb-6">
      <DrawerDialog.Close>
        <Button className="w-full sm:w-[150px]" variant='outline'>Cancelar</Button>
      </DrawerDialog.Close>
      <DrawerDialog.Close>{children}</DrawerDialog.Close>
    </div>
  )
}
