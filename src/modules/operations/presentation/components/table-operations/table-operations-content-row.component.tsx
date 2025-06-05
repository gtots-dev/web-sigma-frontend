'use client'

import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { LogIn } from 'lucide-react'
import { useOperationStore } from '@/modules/system/presentation/store/operation.store'
import { useRouter } from 'next/navigation'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'

interface TableOperationContentRowComponentProps {
  operation: OperationInterface
}

export function TableOperationContentRowComponent({
  operation
}: TableOperationContentRowComponentProps) {
  const { replace } = useRouter()
  const { setOperation } = useOperationStore()

  return (
    <TableRow>
      <TableCell
        className="px-5 sm:px-10 text-zinc-700 dark:text-zinc-50"
        colSpan={3}
      >
        {operation.name}
      </TableCell>
      <TableCell className="px-5 sm:px-10 text-right" colSpan={1}>
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            setOperation(operation)
            replace(PATHNAMES.OPERATION_OPTIONS)
          }}
        >
          <LogIn />
        </Button>
      </TableCell>
    </TableRow>
  )
}
