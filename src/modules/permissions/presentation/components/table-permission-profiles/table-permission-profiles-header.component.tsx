'use client'

import {
  TableHead,
  TableHeader,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { cn } from '@/modules/shared/presentation/lib/utils'

export function TablePermissionProfilesHeaderComponent() {
  const baseClass = 'h-9 px-5 sm:px-10 text-xs'
  return (
    <TableHeader>
      <TableRow className="bg-muted !border-0">
        <TableHead className={cn(baseClass, 'rounded-tl-lg')}>Nome</TableHead>
        <TableHead
          className={cn(baseClass, 'rounded-tr-lg text-right')}
          colSpan={1}
        >
          Opções
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
