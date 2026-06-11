'use client'

import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import type { ReactNode } from 'react'
import { useTableUser } from '../../contexts/table-user.context'

interface TableUsersItemComponentProps {
  children: ReactNode
}

const truncateText =
  'h-auto md:h-[52.5px] sm:max-w-full truncate whitespace-nowrap overflow-hidden'
const baseCell = 'ps-5 sm:ps-10 text-zinc-700 dark:text-zinc-50'

export function TableUsersItemComponent({
  children
}: TableUsersItemComponentProps) {
  const user = useTableUser()

  return (
    <TableRow>
      <TableCell className={`${baseCell} ${truncateText} w-[30%] max-w-0`}>
        <div className="flex items-center gap-x-3.5 h-full w-full">
          {!user.enabled ? (
            <span className="block bg-red-500 outline-2 outline outline-red-600 h-1.5 w-1.5 rounded-full shrink-0"></span>
          ) : (
            <span className="block bg-green-500 outline-2 outline outline-green-600 h-1.5 w-1.5 rounded-full shrink-0"></span>
          )}
          <div className="flex flex-col min-w-0 w-full">
            <span title={user.name} className="truncate font-medium">{user.name}</span>
            {user.description && (
              <span title={user.description} className="truncate text-xs text-zinc-500 block mt-0.5">
                {user.description}
              </span>
            )}
            <span title={user.email} className="truncate text-xs text-zinc-400 lg:hidden mt-0.5">
              {user.email}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className={`${baseCell} ${truncateText} hidden lg:table-cell`}>
        {user.email}
      </TableCell>
      <TableCell className={`${baseCell} ${truncateText} hidden xl:table-cell`}>
        {user.company}
      </TableCell>
      <TableCell className="pe-5 sm:pe-10 text-right" colSpan={1}>
        {children}
      </TableCell>
    </TableRow>
  )
}
