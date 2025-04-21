import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'

interface TableUsersMessageProps {
  message: string
}

export function TableUsersMessage({ message }: TableUsersMessageProps) {
  return (
    <TableRow className="!border-b bg-zinc-50 dark:bg-zinc-900">
      <TableCell className="h-[52px] px-10 text-zinc-700/80 dark:text-zinc-50/80">
        {message}
      </TableCell>
    </TableRow>
  )
}
