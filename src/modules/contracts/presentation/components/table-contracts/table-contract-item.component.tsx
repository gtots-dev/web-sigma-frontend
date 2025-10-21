'use client'

import type { ReactNode } from 'react'
import { Skeleton } from '@/modules/shared/presentation/components/shadcn/skeleton'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'
import { useTableContract } from '../../contexts/table-contract.context'
import { AvailabilityStatusComponent } from '@/modules/shared/presentation/components/availability-status/availability-status.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useRouter } from 'next/navigation'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { LogIn } from 'lucide-react'
import { useParams } from 'next/navigation'

interface TableContractsItemComponentProps {
  children?: ReactNode
}

const truncateText =
  'h-auto md:h-[52.5px] sm:max-w-full truncate whitespace-nowrap overflow-hidden'
const baseCell = 'ps-5 sm:ps-10 text-zinc-700 dark:text-zinc-50'

export function TableContractsItemComponent({
  children
}: TableContractsItemComponentProps) {
  const { operationId }: { operationId: string } = useParams()
  const { replace } = useRouter()
  const contract = useTableContract()
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
        <span title={contract.name} className={`${truncateText} !h-auto`}>
          {contract.name}
        </span>
        <span title={contract.alias} className={`${truncateText} !h-auto`}>
          {contract.alias}
        </span>
      </TableCell>
      <TableCell className="px-5 sm:px-10 text-center">
        <Button
          size="icon"
          variant="outline"
          onClick={() =>
            replace(
              PATHNAMES.CONTRACTS_OPTIONS(
                Number(operationId),
                Number(contract.id)
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
      <TableCell colSpan={2} className={`${baseCell} ${truncateText} w-[30%]`}>
        {contract.name}
      </TableCell>
      {isLarge && (
        <TableCell className={`${baseCell} ${truncateText}`}>
          {contract.alias}
        </TableCell>
      )}
      {isExtraLarge && (
        <TableCell className={`${baseCell} ${truncateText}`}>
          <AvailabilityStatusComponent enabled={contract.enabled} />
        </TableCell>
      )}
      {children && (
        <TableCell className="text-center">{children}</TableCell>
      )}
      <TableCell className="px-5 text sm:px-10 text-right" colSpan={1}>
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            replace(
              PATHNAMES.CONTRACTS_OPTIONS(
                Number(operationId),
                Number(contract.id)
              )
            )
          }}
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
