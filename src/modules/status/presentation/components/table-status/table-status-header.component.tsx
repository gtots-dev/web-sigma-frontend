import {
  TableHead,
  TableHeader,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'

export function TableStatusHeaderComponent() {
  const baseClass = 'h-9 px-5 sm:px-10 text-xs'

  return (
    <TableHeader>
      <TableRow className="bg-muted !border-0">
        <TableHead className={`${baseClass} w-[46%] max-w-0 rounded-tl-lg`}>
          Descrição
        </TableHead>

        <TableHead className={`${baseClass} hidden sm:table-cell w-[20%]`}>
          Origem
        </TableHead>

        {/* <TableHead className={`${baseClass} hidden sm:table-cell w-[22%]`}>
          Status
        </TableHead> */}

        <TableHead className={`${baseClass} rounded-tr-lg text-right w-[12%]`}>
          Opções
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
