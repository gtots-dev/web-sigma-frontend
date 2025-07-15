import {
  TableHead,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'

export function TableOperationHeaderRowComponent() {
  return (
    <TableRow className="bg-muted !border-0">
      <TableHead
        className="h-9 px-5 sm:px-10 text-xs rounded-tl-lg"
        colSpan={3}
      >
        Nome
      </TableHead>
      <TableHead
        className="h-9 px-5 sm:px-10 text-right text-xs rounded-tr-lg"
        colSpan={1}
      >
        Acessar
      </TableHead>
    </TableRow>
  )
}
