'use client'

import type { ReactNode } from 'react'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { useTableViolations } from '../../contexts/table-violations.context'

interface TableViolationsItemComponentProps {
  children?: ReactNode
}

const truncateText =
  'h-auto md:h-[52.5px] sm:max-w-full truncate whitespace-nowrap overflow-hidden'
const baseCell = 'ps-5 sm:ps-10 text-zinc-700 dark:text-zinc-50'

export function TableViolationsItemComponent({
  children
}: TableViolationsItemComponentProps) {
  const violation = useTableViolations()

  return (
    <TableRow>
      <TableCell className={`${baseCell} ${truncateText} w-[30%] max-w-0`}>
        <div className="flex flex-col gap-y-0.5 min-w-0 w-full">
          <span title={violation.name} className="truncate font-medium block">
            {violation.name}
          </span>
          <span
            title={String(violation.code)}
            className="truncate text-xs text-zinc-500 lg:hidden block mt-0.5"
          >
            Código: {violation.code}
          </span>
          <div className="lg:hidden flex items-center gap-x-1.5 mt-0.5">
            <span className="text-xs text-zinc-500">Cor:</span>
            <div
              className="h-2.5 w-2.5 rounded-sm shrink-0 border border-zinc-200 dark:border-zinc-800"
              style={{ backgroundColor: violation.color }}
            />
          </div>
        </div>
      </TableCell>

      <TableCell className={`${baseCell} ${truncateText} hidden lg:table-cell`}>
        {violation.code}
      </TableCell>

      <TableCell className={`${baseCell} ${truncateText} hidden lg:table-cell`}>
        <div className="flex items-center gap-x-2">
          <div
            className="h-3 w-3 rounded-sm border border-zinc-200 dark:border-zinc-800"
            style={{ backgroundColor: violation.color }}
          />
          <span className="text-zinc-500 text-xs">{violation.color}</span>
        </div>
      </TableCell>

      <TableCell className="pe-5 sm:pe-10 text-right" colSpan={1}>
        {children}
      </TableCell>
    </TableRow>
  )
}
