'use client'

import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import { useOperationStore } from '@/modules/system/presentation/store/operation.store'
import { Building2, ChevronsUpDown } from 'lucide-react'

export function MenuSelectOperationTriggerComponent() {
  const { operation } = useOperationStore()

  return (
    <DrawerDialog.Trigger>
      <div className="h-16 flex bg-white dark:bg-zinc-950 border rounded-lg fill: w-full gap-x-3 p-3 xl:w-[350px] cursor-pointer hover:bg-white/50 dark:hover:bg-zinc-950/50">
        <div className="grid place-content-center h-10 w-10 rounded-md bg-primary-600">
          <Building2 className="h-4 w-4 text-white" />
        </div>
        <div className="flex flex-col items-start h-auto">
          <span className="font-bold text-sm">Operação</span>
          {operation.id && operation.name ? (
            <span className="text-start font-medium underline underline-offset-4 text-xs">
              {operation.name}
            </span>
          ) : (
            <Skeleton className="w-[150px] !h-[10px] mt-1.5 rounded-full" />
          )}
        </div>
        <div className="grid place-content-center h-10 w-10 rounded-md ms-auto">
          <ChevronsUpDown className="h-5 w-5" />
        </div>
      </div>
    </DrawerDialog.Trigger>
  )
}
