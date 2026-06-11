'use client'

import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import type { ReactNode } from 'react'
import { useTableActivityReport } from '../../contexts/table-activity-report.context'
import { useFormattedDate } from '@/modules/shared/presentation/hooks/use-formatted-date.hook'

interface TableActivityReportItemComponentProps {
  children: ReactNode
}

const cellBase = 'ps-5 sm:ps-10 text-zinc-700 dark:text-zinc-50 align-middle'

const textCell = 'truncate whitespace-nowrap overflow-hidden min-w-0 w-full'

export function TableActivityReportItemComponent({
  children
}: TableActivityReportItemComponentProps) {
  const log = useTableActivityReport()
  const { formatted } = useFormattedDate(log.created_at)

  return (
    <TableRow className="h-[38px]">
      {/* Data */}
      <TableCell className={cellBase}>
        <div className={textCell}>{formatted}</div>
      </TableCell>

      {/* Usuário */}
      <TableCell className={`${cellBase} hidden lg:table-cell`}>
        <div className="min-w-0">
          <div className={textCell}>{log.user?.name}</div>
        </div>
      </TableCell>

      {/* Contrato */}
      <TableCell className={`${cellBase} hidden xl:table-cell`}>
        <div className={textCell}>{log.contract?.name ?? 'Nenhum'}</div>
      </TableCell>

      {/* Ação */}
      <TableCell className={`${cellBase} hidden xl:table-cell`}>
        <div className={textCell}>{log.action}</div>
      </TableCell>

      {/* Ações (children) */}
      <TableCell className="pe-5 sm:pe-10 text-right align-middle">
        {children}
      </TableCell>
    </TableRow>
  )
}
