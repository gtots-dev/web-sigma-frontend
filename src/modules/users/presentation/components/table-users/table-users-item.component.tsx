'use client'

import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'
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
  const isLarge = useMediaQuery('(min-width: 1024px)')
  const isExtraLarge = useMediaQuery('(min-width: 1230px)')

  const renderSkeleton = () => (
    <TableRow>
      <TableCell className={`${baseCell} ${truncateText}`} colSpan={4}>
        <Skeleton className="w-full !h-[10px] rounded-full" />
      </TableCell>
    </TableRow>
  )

  const renderCompactView = () => (
    <TableCell className={`${baseCell} flex flex-col gap-y-0.5`}>
      <span title={user.name} className={`${truncateText} !h-auto`}>
        {user.name}
      </span>
      <span title={user.email} className={`${truncateText} !h-auto`}>
        {user.email}
      </span>
    </TableCell>
  )

  const renderExpandedView = () => (
    <>
      <TableCell
        className={`${baseCell} ${truncateText} flex items-center gap-x-3.5`}
      >
        {!user.enabled ? (
          <span className="block bg-red-500 outline-2 outline outline-red-600 h-1 w-1 rounded-full"></span>
        ) : (
          <span className="block bg-green-500 outline-2 outline outline-green-600 h-1 w-1 rounded-full"></span>
        )}

        {user.name}
      </TableCell>
      {isLarge && (
        <TableCell className={`${baseCell} ${truncateText}`}>
          {user.email}
        </TableCell>
      )}
      {isExtraLarge && (
        <TableCell className={`${baseCell} ${truncateText}`}>
          {user.company}
        </TableCell>
      )}
    </>
  )

  if (isExtraLarge === undefined || isLarge === undefined) {
    return renderSkeleton()
  }

  return (
    <TableRow>
      {isLarge ? renderExpandedView() : renderCompactView()}
      <TableCell className="pe-5 sm:pe-10 text-right" colSpan={1}>
        {children}
      </TableCell>
    </TableRow>
  )
}
