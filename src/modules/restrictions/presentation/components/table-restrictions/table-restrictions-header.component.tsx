import {
  TableHead,
  TableHeader,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'

export function TableRestrictionsHeaderComponent() {
  const baseClass = 'h-9 px-5 sm:px-10 text-xs'

  return (
    <TableHeader>
      <TableRow className="bg-muted !border-0">
        <TableHead className={`${baseClass} w-[40%] max-w-0 rounded-tl-lg`}>
          Nome
        </TableHead>

        <TableHead className={`${baseClass} rounded-tr-lg hidden lg:table-cell`}>
          Código
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
