'use client'

import type { ReactNode } from 'react'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { AvailabilityStatusComponent } from '@/modules/shared/presentation/components/availability-status/availability-status.component'
import { useTableGroup } from '../../contexts/table-group.context'

interface TableGroupsItemComponentProps {
  children?: ReactNode
}

const truncateText =
  'h-auto md:h-[52.5px] sm:max-w-full truncate whitespace-nowrap overflow-hidden'
const baseCell = 'ps-5 sm:ps-10 text-zinc-700 dark:text-zinc-50'

export function TableGroupsItemComponent({
  children
}: TableGroupsItemComponentProps) {
  const { group } = useTableGroup()

  return (
    <TableRow>
      <TableCell className={`${baseCell} w-[30%] max-w-0`}>
        <div className="flex flex-col gap-y-0.5 min-w-0 w-full">
          <span
            title={group.name}
            className={`${truncateText} !h-auto font-medium`}
          >
            {group.name}
          </span>
          {group.description && (
            <span
              title={group.description}
              className="truncate text-xs text-zinc-500 block mt-0.5"
            >
              {group.description}
            </span>
          )}
        </div>
      </TableCell>
      <TableCell className={`${baseCell} ${truncateText} hidden xl:table-cell`}>
        <AvailabilityStatusComponent enabled={group.enabled} />
      </TableCell>
      <TableCell className="pe-5 sm:pe-10 text-right" colSpan={1}>
        {children}
      </TableCell>
    </TableRow>
  )
}
