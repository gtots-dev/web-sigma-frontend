'use client'

import {
  TableHead,
  TableHeader,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'

export function TableActivityReportHeaderComponent() {
  const baseClass = 'h-9 px-5 sm:px-10 text-xs'

  return (
    <TableHeader>
      <TableRow className="bg-muted !border-0">
        <TableHead className={`${baseClass} w-[160px] rounded-tl-lg`}>
          Realizado
        </TableHead>

        <TableHead className={`${baseClass} w-[180px] hidden lg:table-cell`}>
          Usuário
        </TableHead>

        <TableHead className={`${baseClass} w-[180px] hidden xl:table-cell`}>
          Contrato
        </TableHead>

        <TableHead className={`${baseClass} hidden xl:table-cell`}>
          Ação
        </TableHead>

        <TableHead
          className={`${baseClass} w-[120px] rounded-tr-lg text-right`}
        >
          Opções
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
