'use client'

import {
  TableHead,
  TableHeader,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'

export function TableLanesHeaderComponent() {
  const isLarge = useMediaQuery('(min-width: 1024px)')
  const isExtraLarge = useMediaQuery('(min-width: 1230px)')
  const baseClass = 'h-9 px-5 sm:px-10 text-xs'

  return (
    <TableHeader>
      <TableRow className="bg-muted !border-0">
        <TableHead
          {...(isLarge ? { colSpan: 2 } : {})}
          className={`${baseClass} w-[30%] rounded-tl-lg`}
        >
          Nome
        </TableHead>

        {isExtraLarge && <TableHead className={baseClass}>Status</TableHead>}

        <TableHead className={`${baseClass} rounded-tr-lg text-right`}>
          Opções
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
