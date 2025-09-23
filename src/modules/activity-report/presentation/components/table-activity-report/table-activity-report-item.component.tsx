'use client'

import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'
import type { ReactNode } from 'react'
import { useTableActivityReport } from '../../contexts/table-activity-report.context'
import { useFormattedDate } from '@/modules/shared/presentation/hooks/use-formatted-date.hook'

interface TableActivityReportItemComponentProps {
  children: ReactNode
}

const truncateText =
  'h-auto md:h-[38px] sm:max-w-full truncate whitespace-nowrap overflow-hidden'
const baseCell = 'ps-5 sm:ps-10 text-zinc-700 dark:text-zinc-50'

export function TableActivityReportItemComponent({
  children
}: TableActivityReportItemComponentProps) {
  const log = useTableActivityReport()
  const { formatted } = useFormattedDate(log.created_at)
  const isLarge = useMediaQuery('(min-width: 1024px)')
  const isExtraLarge = useMediaQuery('(min-width: 1230px)')

  const renderSkeleton = () => (
    <TableRow className="!h-[38px]">
      <TableCell className={`${baseCell} ${truncateText}`} colSpan={6}>
        <Skeleton className="w-full !h-[5px] rounded-full" />
      </TableCell>
    </TableRow>
  )

  const renderCompactView = () => (
    <TableCell className={`${baseCell} flex flex-col gap-y-0.5`}>
      <span title={log.user?.name} className={`${truncateText} !h-auto`}>
        {log.user?.name}
      </span>
      <span
        title={log.action}
        className={`${truncateText} !h-auto`}
      >
        {log.action}
      </span>
    </TableCell>
  )

  const renderExpandedView = () => (
    <>
      <TableCell className={`${baseCell} ${truncateText}`} colSpan={1}>
        {formatted}
      </TableCell>

      {isLarge && (
        <TableCell
          className={`${baseCell} ${truncateText} flex items-center gap-x-3.5`}
          colSpan={1}
        >
          {log.user?.name}
        </TableCell>
      )}
      {isExtraLarge && (
        <TableCell className={`${baseCell} ${truncateText}`} colSpan={1}>
          {log.contract?.name ?? 'Nenhum'}
        </TableCell>
      )}
      {isExtraLarge && (
        <TableCell className={`${baseCell} ${truncateText}`} colSpan={1}>
          {log.action}
        </TableCell>
      )}
    </>
  )

  if (isExtraLarge === undefined || isLarge === undefined) {
    return renderSkeleton()
  }

  return (
    <TableRow className="!h-[38px]">
      {isLarge ? renderExpandedView() : renderCompactView()}
      <TableCell className="pe-5 sm:pe-10 text-right" colSpan={1}>
        {children}
      </TableCell>
    </TableRow>
  )
}
