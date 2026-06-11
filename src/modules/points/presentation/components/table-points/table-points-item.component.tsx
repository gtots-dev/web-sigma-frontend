'use client'

import type { ReactNode } from 'react'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { AvailabilityStatusComponent } from '@/modules/shared/presentation/components/availability-status/availability-status.component'
import { useTablePoint } from '../../contexts/table-point.context'

interface TablePointsItemComponentProps {
  children?: ReactNode
}

const truncateText =
  'h-auto md:h-[52.5px] sm:max-w-full truncate whitespace-nowrap overflow-hidden'
const baseCell = 'ps-5 sm:ps-10 text-zinc-700 dark:text-zinc-50'

export function TablePointsItemComponent({
  children
}: TablePointsItemComponentProps) {
  const { point } = useTablePoint()

  return (
    <TableRow>
      <TableCell className={`${baseCell} w-[30%] max-w-0`}>
        <div className="flex flex-col gap-y-0.5 min-w-0 w-full">
          <span title={point.name} className="truncate font-medium block">
            {point.name}
          </span>
          {point.description && (
            <span title={point.description} className="truncate text-xs text-zinc-500 block mt-0.5">
              {point.description}
            </span>
          )}
        </div>
      </TableCell>
      <TableCell className={`${baseCell} ${truncateText} hidden xl:table-cell`}>
        <AvailabilityStatusComponent enabled={point.enabled} />
      </TableCell>
      <TableCell className="pe-5 sm:pe-10 text-right" colSpan={1}>
        {children}
      </TableCell>
    </TableRow>
  )
}
