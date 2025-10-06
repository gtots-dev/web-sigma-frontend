import { Square } from 'lucide-react'
import { cn } from '../../lib/utils'

interface GroupItemSelectorSquareCheckboxComponentProps {
  selected: boolean
}

export function GroupItemSelectorSquareCheckboxComponent({
  selected
}: GroupItemSelectorSquareCheckboxComponentProps) {
  return (
    <Square
      className={cn(
        '!w-3.5 !h-3.5 ms-2',
        selected && 'fill-zinc-950 dark:fill-white'
      )}
    />
  )
}
