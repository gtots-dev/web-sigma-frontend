import { CommandItem } from '@/modules/shared/presentation/components/shadcn/command'
import { ReactNode } from 'react'
import type { BaseItem } from './group-item-selector-list.component'
import { cn } from '../../lib/utils'
import { useGroupItemSelectorContext } from '../../contexts/group-item-selector.context'

interface GroupItemSelectorItemProps<Item extends BaseItem> {
  id: number
  item: Item
  className?: string
  children: (props: { selected: boolean }) => ReactNode
}

export function GroupItemSelectorItem<Item extends BaseItem>({
  id,
  item,
  className,
  children
}: GroupItemSelectorItemProps<Item>) {
  const { isSelected, toggleItem } = useGroupItemSelectorContext<Item>()
  const selected = isSelected(id)

  return (
    <CommandItem
      onSelect={() => toggleItem(item)}
      className={cn('flex gap-x-4 items-center justify-start', className)}
      forceMount
    >
      {children({ selected })}
    </CommandItem>
  )
}
