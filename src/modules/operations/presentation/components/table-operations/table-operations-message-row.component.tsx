import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'

interface TableOperationMessageRowProps {
  message: string
}

export function TableOperationMessageRow({
  message
}: TableOperationMessageRowProps) {
  return (
    <TableRow className="!border-b bg-zinc-50 dark:bg-zinc-900">
      <TableCell
        className="h-[52px] px-10 text-zinc-700/80 dark:text-zinc-50/80"
        colSpan={4}
      >
        {message}
      </TableCell>
    </TableRow>
  )
}
