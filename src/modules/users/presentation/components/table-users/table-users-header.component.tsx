'use client'

import {
  TableHead,
  TableHeader,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { useMediaQuery } from '@/modules/shared/presentation/hooks/use-media-query'

export function TableUsersHeaderComponent() {
  const isMedium = useMediaQuery('(min-width: 768px)')
  const isLarge = useMediaQuery('(min-width: 1024px)')
  const baseClass = 'h-9 px-5 sm:px-10 text-xs'

  return (
    <TableHeader>
      <TableRow className="bg-muted !border-0">
        <TableHead className={`${baseClass} rounded-tl-lg`}>Nome</TableHead>

        {isMedium && (
          <TableHead className={baseClass} colSpan={1}>
            Email
          </TableHead>
        )}

        {isLarge && (
          <TableHead className={baseClass} colSpan={1}>
            Empresa
          </TableHead>
        )}

        <TableHead
          className={`${baseClass} rounded-tr-lg text-right`}
          colSpan={1}
        >
          Opções
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
