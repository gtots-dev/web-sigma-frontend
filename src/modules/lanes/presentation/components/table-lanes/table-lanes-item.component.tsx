'use client'

import type { ReactNode } from 'react'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { useTableLane } from '../../contexts/table-lanes.context'
import { AvailabilityStatusComponent } from '@/modules/shared/presentation/components/availability-status/availability-status.component'

interface TableLanesItemComponentProps {
  children?: ReactNode
}

const truncateText =
  'h-auto md:h-[52.5px] sm:max-w-full truncate whitespace-nowrap overflow-hidden'
const baseCell = 'ps-5 sm:ps-10 text-zinc-700 dark:text-zinc-50'

export function TableLanesItemComponent({
  children
}: TableLanesItemComponentProps) {
  const Lane = useTableLane()

  return (
    <TableRow>
      <TableCell className={`${baseCell} w-[30%] max-w-0`}>
        <div className="flex flex-col gap-y-0.5 w-full">
          <span title={Lane.name} className={`${truncateText} !h-auto`}>
            {Lane.name}
          </span>
        </div>
      </TableCell>
      <TableCell className={`${baseCell} ${truncateText} hidden xl:table-cell`}>
        <AvailabilityStatusComponent enabled={Lane.enabled} />
      </TableCell>
      <TableCell className="pe-5 sm:pe-10 text-right" colSpan={1}>
        {children}
      </TableCell>
    </TableRow>
  )
}
