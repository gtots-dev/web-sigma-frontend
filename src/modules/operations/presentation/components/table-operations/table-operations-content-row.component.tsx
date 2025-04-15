'use client'

import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { LogIn } from 'lucide-react'
import { useSetSelectOperation } from '../../hooks/use-set-selection-operation.hook'

interface TableOperationContentRowComponentProps {
  operation: OperationInterface
}

export function TableOperationContentRowComponent({
  operation
}: TableOperationContentRowComponentProps) {
  const { setOperation } = useSetSelectOperation()

  return (
    <TableRow>
      <TableCell className="px-10 text-zinc-700 dark:text-zinc-50" colSpan={3}>
        {operation.name}
      </TableCell>
      <TableCell className="px-10 text-right" colSpan={1}>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setOperation(operation)}
        >
          <LogIn />
        </Button>
      </TableCell>
    </TableRow>
  )
}
