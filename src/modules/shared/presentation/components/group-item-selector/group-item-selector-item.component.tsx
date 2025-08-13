import { CommandItem } from '@/modules/shared/presentation/components/shadcn/command'
import { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { useGroupItemSelectorContext } from '../../contexts/group-item-selector.context'

interface GroupItemSelectorItemProps {
  id: number
  className?: string
  children: (props: { selected: boolean }) => ReactNode
}

export function GroupItemSelectorItem({
  id,
  className,
  children
}: GroupItemSelectorItemProps) {
  const { isSelected } = useGroupItemSelectorContext()
  const selected = isSelected(id)

  return (
    <CommandItem
      className={cn('flex gap-x-4 items-center justify-start', className)}
      forceMount
    >
      {children({ selected })}
    </CommandItem>
  )
}
