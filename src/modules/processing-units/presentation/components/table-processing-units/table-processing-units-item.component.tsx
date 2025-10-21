'use client'

import type { ReactNode } from 'react'
import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'
import { useTableProcessingUnit } from '../../contexts/table-processing-units.context'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { LogIn } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { AvailabilityStatusComponent } from '@/modules/shared/presentation/components/availability-status/availability-status.component'

interface TabledProcessingUnitsItemComponentProps {
  children?: ReactNode
}

const truncateText =
  'h-auto md:h-[52.5px] sm:max-w-full truncate whitespace-nowrap overflow-hidden'
const baseCell = 'ps-5 sm:ps-10 text-zinc-700 dark:text-zinc-50'

export function TabledProcessingUnitsItemComponent({
  children
}: TabledProcessingUnitsItemComponentProps) {
  const processingUnit = useTableProcessingUnit()
  const { operationId, contractId } = useParams()
  const { replace } = useRouter()
  const isLarge = useMediaQuery('(min-width: 1024px)')
  const isExtraLarge = useMediaQuery('(min-width: 1230px)')

  const renderSkeleton = () => (
    <TableRow>
      <TableCell className={`${baseCell} ${truncateText}`}>
        <Skeleton className="w-full !h-[10px] rounded-full" />
      </TableCell>
    </TableRow>
  )

  const renderCompactView = () => (
    <>
      <TableCell className={`${baseCell} flex flex-col gap-y-0.5`} colSpan={3}>
        <span title={processingUnit.name} className={`${truncateText} !h-auto`}>
          {processingUnit.name}
        </span>
      </TableCell>
      <TableCell className="px-5 sm:px-10 text-center !w-[100px]" colSpan={1}>
        <Button
          size="icon"
          variant="outline"
          onClick={() =>
            replace(
              PATHNAMES.PROCESSING_UNITS_OPTIONS(
                Number(operationId),
                Number(contractId),
                Number(processingUnit.id)
              )
            )
          }
        >
          <LogIn />
        </Button>
      </TableCell>
    </>
  )

  const renderExpandedView = () => (
    <>
      <TableCell className={`${baseCell} ${truncateText}`} colSpan={2}>
        {processingUnit.name}
      </TableCell>
      {isExtraLarge && (
        <TableCell className={`${baseCell} ${truncateText}`}>
          <AvailabilityStatusComponent enabled={processingUnit.enabled} />
        </TableCell>
      )}
      {children && <TableCell className="text-center">{children}</TableCell>}
      <TableCell className="px-5 sm:px-10 text-end !w-[100px]" colSpan={1}>
        <Button
          size="icon"
          variant="outline"
          onClick={() =>
            replace(
              PATHNAMES.PROCESSING_UNITS_OPTIONS(
                Number(operationId),
                Number(contractId),
                Number(processingUnit.id)
              )
            )
          }
        >
          <LogIn />
        </Button>
      </TableCell>
    </>
  )

  if (isExtraLarge === undefined || isLarge === undefined) {
    return renderSkeleton()
  }

  return (
    <TableRow>{isLarge ? renderExpandedView() : renderCompactView()}</TableRow>
  )
}
