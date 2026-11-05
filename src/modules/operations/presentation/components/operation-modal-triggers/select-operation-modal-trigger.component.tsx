'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Building2, ChevronsUpDown } from 'lucide-react'
import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import { useOperationSelector } from '../../hooks/use-operation-selector.hook'

export interface SelectOperationModalTriggerProps {
  operationId: OperationInterface['id']
  operations: OperationInterface[]
}

export function SelectOperationModalTriggerComponent({
  operationId,
  operations
}: SelectOperationModalTriggerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { operation } = useOperationSelector(operationId, operations)

  const handleOpen = () => {
    router.push(`${pathname}/modal/select-operation`, { scroll: false })
  }

  return (
    <button
      type="button"
      onClick={handleOpen}
      className="h-16 flex bg-white dark:bg-zinc-950 border rounded-lg w-full gap-x-3 p-3 xl:w-[350px] cursor-pointer hover:bg-white/50 dark:hover:bg-zinc-950/50 text-left"
    >
      <div className="grid place-content-center h-10 w-10 rounded-md bg-primary-600 shrink-0">
        <Building2 className="h-4 w-4 text-white" />
      </div>
      <div className="flex flex-col items-start h-auto min-w-0">
        <span className="font-bold text-sm">Operação</span>
        {operation?.id && operation?.name ? (
          <span className="text-start font-medium underline underline-offset-4 text-xs truncate max-w-full">
            {operation.name}
          </span>
        ) : (
          <Skeleton className="w-[150px] !h-[10px] mt-1.5 rounded-full" />
        )}
      </div>
      <div className="grid place-content-center h-10 w-10 rounded-md ms-auto shrink-0">
        <ChevronsUpDown className="h-5 w-5" />
      </div>
    </button>
  )
}
