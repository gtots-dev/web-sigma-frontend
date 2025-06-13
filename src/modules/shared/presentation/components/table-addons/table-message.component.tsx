import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import type { ComponentProps } from 'react'

interface TableMessageProps extends ComponentProps<'td'> {
  message: string
}

export function TableMessage({ message, ...props }: TableMessageProps) {
  return (
    <TableRow className="!border-b bg-zinc-50 dark:bg-zinc-900">
      <TableCell
        className="h-[52px] px-10 text-zinc-700/80 dark:text-zinc-50/80 w-full"
        {...props}
      >
        {message}
      </TableCell>
    </TableRow>
  )
}
