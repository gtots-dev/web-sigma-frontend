'use client'

import type { ReactNode } from 'react'
import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'
import { useTableVehiclesTypes } from '../../contexts/table-vehicles-types.context'

interface TableVehiclesTypesItemComponentProps {
  children?: ReactNode
}

const truncateText =
  'h-auto md:h-[52.5px] sm:max-w-full truncate whitespace-nowrap overflow-hidden'
const baseCell = 'ps-5 sm:ps-10 text-zinc-700 dark:text-zinc-50'

export function TableVehiclesTypesItemComponent({
  children
}: TableVehiclesTypesItemComponentProps) {
  const vehicleType = useTableVehiclesTypes()
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
        <span title={vehicleType.name} className={`${truncateText} !h-auto`}>
          {vehicleType.name}
        </span>
        <span className={`${truncateText} !h-auto`}>
          <div
            className={`flex h-3 w-3 rounded-sm me-2 bg-[${vehicleType.color}]`}
          ></div>
          {vehicleType.color}
        </span>
      </TableCell>
    </>
  )

  const renderExpandedView = () => (
    <>
      <TableCell colSpan={2} className={`${baseCell} ${truncateText} w-[30%]`}>
        {vehicleType.name}
      </TableCell>
      <TableCell className={`${baseCell} ${truncateText} w-[30%]`}>
        <div className={`${truncateText} flex items-center gap-x-3 !h-auto`}>
          <div
            className={`flex h-3 w-3 rounded-sm`}
            style={{ backgroundColor: vehicleType.color }}
          ></div>
          {vehicleType.color}
        </div>
      </TableCell>
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
