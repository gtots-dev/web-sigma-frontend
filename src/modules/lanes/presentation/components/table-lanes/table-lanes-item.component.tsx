'use client'

import type { ReactNode } from 'react'
import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'
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
  const isLarge = useMediaQuery('(min-width: 1024px)')
  const isExtraLarge = useMediaQuery('(min-width: 1230px)')

  const renderSkeleton = () => (
    <TableRow>
      <TableCell className={`${baseCell} ${truncateText}`} colSpan={6}>
        <Skeleton className="w-full !h-[10px] rounded-full" />
      </TableCell>
    </TableRow>
  )

  const renderCompactView = () => (
    <>
      <TableCell className={`${baseCell} flex flex-col gap-y-0.5`}>
        <span title={Lane.name} className={`${truncateText} !h-auto`}>
          {Lane.name}
        </span>
      </TableCell>
    </>
  )

  const renderExpandedView = () => (
    <>
      <TableCell colSpan={2} className={`${baseCell} ${truncateText} w-[30%]`}>
        {Lane.name}
      </TableCell>
      {isExtraLarge && (
        <TableCell className={`${baseCell} ${truncateText}`}>
          <AvailabilityStatusComponent enabled={Lane.enabled} />
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
