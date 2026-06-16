import {
  TableHead,
  TableHeader,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'

export function TableContractsHeaderComponent() {
  const baseClass = 'h-9 px-5 sm:px-10 text-xs'

  return (
    <TableHeader>
      <TableRow className="bg-muted !border-0">
        <TableHead className={`${baseClass} w-[30%] max-w-0 rounded-tl-lg`}>
          Nome
        </TableHead>

        <TableHead className={`${baseClass} hidden lg:table-cell`}>
          Etiqueta
        </TableHead>

        <TableHead className={`${baseClass} hidden xl:table-cell`}>
          Status
        </TableHead>

        <TableHead className={`${baseClass} text-center w-[120px]`}>
          Opções
        </TableHead>

        <TableHead className={`${baseClass} rounded-tr-lg text-right w-[100px]`}>
          Acessar
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
