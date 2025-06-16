'use client'

import { cn } from '@/modules/shared/presentation/lib/utils'
import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import type { ReactNode } from 'react'
import { useTablePermissionProfile } from '../../contexts/table-permission-profiles.context'

interface TablePermissionProfilesItemComponentProps {
  children: ReactNode
}

const truncateText =
  'h-auto md:h-[52.5px] sm:max-w-full truncate whitespace-nowrap overflow-hidden'
const baseCell = 'ps-5 sm:ps-10 text-zinc-700 dark:text-zinc-50'

export function TablePermissionProfilesItemComponent({
  children
}: TablePermissionProfilesItemComponentProps) {
  const permission = useTablePermissionProfile()

  if (!permission)
    return (
      <TableRow>
        <TableCell className={cn(baseCell, truncateText)} colSpan={4}>
          <Skeleton className="w-full !h-[10px] rounded-full" />
        </TableCell>
      </TableRow>
    )

  return (
    <TableRow>
      <TableCell
        className={cn(baseCell, truncateText, 'flex items-center gap-x-3.5')}
      >
        {permission.name}
      </TableCell>
      <TableCell className="pe-5 sm:pe-10 text-right" colSpan={1}>
        {children}
      </TableCell>
    </TableRow>
  )
}
