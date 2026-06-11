'use client'

import type { ReactNode } from 'react'
import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { useTableContract } from '../../contexts/table-contract.context'
import { AvailabilityStatusComponent } from '@/modules/shared/presentation/components/availability-status/availability-status.component'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useRouter } from 'next/navigation'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { LogIn } from 'lucide-react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

interface TableContractsItemComponentProps {
  children?: ReactNode
}

const truncateText =
  'h-auto md:h-[52.5px] sm:max-w-full truncate whitespace-nowrap overflow-hidden'
const baseCell = 'ps-5 sm:ps-10 text-zinc-700 dark:text-zinc-50'

export function TableContractsItemComponent({
  children
}: TableContractsItemComponentProps) {
  const { operationId }: UrlParams = useParams()
  const { replace } = useRouter()
  const contract = useTableContract()

  return (
    <TableRow>
      <TableCell className={`${baseCell} ${truncateText} w-[30%] max-w-0`}>
        <div className="flex flex-col gap-y-0.5 min-w-0 w-full">
          <span title={contract.name} className="truncate font-medium block">
            {contract.name}
          </span>
          <span title={contract.alias} className="truncate text-xs text-zinc-500 lg:hidden block mt-0.5">
            {contract.alias}
          </span>
        </div>
      </TableCell>
      <TableCell className={`${baseCell} ${truncateText} hidden lg:table-cell`}>
        {contract.alias}
      </TableCell>
      <TableCell className={`${baseCell} ${truncateText} hidden xl:table-cell`}>
        <AvailabilityStatusComponent enabled={contract.enabled} />
      </TableCell>
      <TableCell className="text-center w-[120px]">{children}</TableCell>
      <TableCell className="px-5 sm:px-10 text-right w-[100px]" colSpan={1}>
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
    </TableRow>
  )
}
