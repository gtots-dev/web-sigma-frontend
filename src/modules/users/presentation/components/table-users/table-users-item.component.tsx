'use client'

import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'
import type { UserInterface } from '@/modules/users/domain/interfaces/user.interface'
import type { ReactNode } from 'react'

interface TableUsersItemComponentProps {
  children: ReactNode
  user: UserInterface
}

const truncateText =
  'h-[52.5px] max-w-[150px] truncate whitespace-nowrap overflow-hidden'
const baseCell = 'px-5 sm:px-10 text-zinc-700 dark:text-zinc-50'

export function TableUsersItemComponent({
  user,
  children
}: TableUsersItemComponentProps) {
  const isMedium = useMediaQuery('(min-width: 768px)')
  const isLarge = useMediaQuery('(min-width: 1024px)')

  const renderSkeleton = () => (
    <TableRow>
      <TableCell className={`${baseCell} ${truncateText}`} colSpan={4}>
        <Skeleton className="w-full !h-[10px] rounded-full" />
      </TableCell>
    </TableRow>
  )

  const renderCompactView = () => (
    <TableCell className={`${baseCell} flex flex-col gap-y-0.5`}>
      <span title={user.name} className={truncateText}>
        {user.name}
      </span>
      <span title={user.email} className={truncateText}>
        {user.email}
      </span>
    </TableCell>
  )

  const renderExpandedView = () => (
    <>
      <TableCell className={`${baseCell} ${truncateText}`}>
        {user.name}
      </TableCell>
      <TableCell className={`${baseCell} ${truncateText}`}>
        {user.email}
      </TableCell>
      {isLarge && (
        <TableCell className={`${baseCell} ${truncateText}`}>
          {user.company}
        </TableCell>
      )}
    </>
  )
  
  if (isMedium === undefined || isLarge === undefined) {
    return renderSkeleton()
  }

  return (
    <TableRow>
      {isMedium ? renderExpandedView() : renderCompactView()}
      <TableCell className="px-5 sm:px-10 text-right" colSpan={1}>
        {children}
      </TableCell>
    </TableRow>
  )
}
