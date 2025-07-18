import { Check, Square } from 'lucide-react'
import { cn } from '../../lib/utils'

interface GroupItemSelectorCheckCheckboxComponentProps {
  selected: boolean
  className?: string
}

export function GroupItemSelectorCheckCheckboxComponent({
  selected,
  className
}: GroupItemSelectorCheckCheckboxComponentProps) {
  return (
    <>
      {selected ? (
        <Check className={cn('!w-3.5 !h-3.5', className)} />
      ) : (
        <Square className={cn('!w-3.5 !h-3.5', className)} />
      )}
    </>
  )
}
