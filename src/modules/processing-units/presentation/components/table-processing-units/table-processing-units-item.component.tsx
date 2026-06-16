'use client'

import type { ReactNode } from 'react'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { useTableProcessingUnit } from '../../contexts/table-processing-units.context'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { LogIn } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { AvailabilityStatusComponent } from '@/modules/shared/presentation/components/availability-status/availability-status.component'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

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
  const { operationId, contractId }: UrlParams = useParams()
  const { replace } = useRouter()

  return (
    <TableRow>
      <TableCell className={`${baseCell} w-[30%] max-w-0`}>
        <div className="flex flex-col gap-y-0.5 w-full">
          <span title={processingUnit.name} className={`${truncateText} !h-auto`}>
            {processingUnit.name}
          </span>
        </div>
      </TableCell>
      <TableCell className={`${baseCell} ${truncateText} hidden xl:table-cell`}>
        <AvailabilityStatusComponent enabled={processingUnit.enabled} />
      </TableCell>
      <TableCell className="text-center">{children}</TableCell>
      <TableCell className="px-5 sm:px-10 text-right !w-[100px]" colSpan={1}>
        <Button
          size="icon"
          variant="outline"
          onClick={() =>
            replace(
              PATHNAMES.LANES(
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
    </TableRow>
  )
}
