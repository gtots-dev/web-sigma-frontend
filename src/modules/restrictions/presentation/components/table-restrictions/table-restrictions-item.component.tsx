'use client'

import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { useTableRestrictions } from '../../contexts/table-restrictions.context'

const truncateText =
  'h-auto md:h-[52.5px] sm:max-w-full truncate whitespace-nowrap overflow-hidden'
const baseCell = 'ps-5 sm:ps-10 text-zinc-700 dark:text-zinc-50'

export function TableRestrictionsItemComponent() {
  const restriction = useTableRestrictions()

  return (
    <TableRow>
      <TableCell className={`${baseCell} ${truncateText} w-[40%] max-w-0`}>
        <div className="flex flex-col gap-y-0.5 min-w-0 w-full">
          <span title={restriction.name} className="truncate font-medium block">
            {restriction.name}
          </span>
          <span
            title={String(restriction.code)}
            className="truncate text-xs text-zinc-500 lg:hidden block mt-0.5"
          >
            Código: {restriction.code}
          </span>
        </div>
      </TableCell>

      <TableCell className={`${baseCell} ${truncateText} hidden lg:table-cell`}>
        {restriction.code}
      </TableCell>
    </TableRow>
  )
}
