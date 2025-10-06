'use client'

import { CommandItem } from '@/modules/shared/presentation/components/shadcn/command'
import { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { useGroupItemSelectorContext } from '../../contexts/group-item-selector.context'
import type { BaseItem } from '../group-item-selector/group-item-selector-list.component'

interface GroupItemSelectorItemProps<Item extends BaseItem> {
  id: number
  className?: string
  item: Item
  children: (props: { selected: boolean; toggle: () => void }) => ReactNode
}

export function GroupItemSelectorItem<Item extends BaseItem>({
  id,
  className,
  item,
  children
}: GroupItemSelectorItemProps<Item>) {
  const { isSelected, toggleItem } = useGroupItemSelectorContext<Item>()
  const selected = isSelected(id)

  return (
    <CommandItem
      className={cn('flex gap-x-4 items-center justify-start', className)}
      forceMount
    >
      {children({
        selected,
        toggle: () => toggleItem(item)
      })}
    </CommandItem>
  )
}
