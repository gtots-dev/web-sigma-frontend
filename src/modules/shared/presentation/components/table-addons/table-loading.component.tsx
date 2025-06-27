import {
  TableCell,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { Loader2 } from 'lucide-react'
import type { ComponentProps } from 'react'

export function TableLoading(props: ComponentProps<'td'>) {
  return (
    <TableRow className="!border-b bg-zinc-50 dark:bg-zinc-900">
      <TableCell
        className="h-[52px] px-10 text-zinc-700/80 dark:text-zinc-50/80"
        {...props}
      >
        <div className="flex justify-center items-center h-full gap-x-2 w-full">
          <Loader2 className="animate-spin h-4 w-4" />
          <span className="text-sm">Carregando ...</span>
        </div>
      </TableCell>
    </TableRow>
  )
}
