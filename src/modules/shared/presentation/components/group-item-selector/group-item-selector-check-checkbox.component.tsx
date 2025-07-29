'use client'

import { Check, Square } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useGroupItemSelectorContext } from '../../contexts/group-item-selector.context'
import type { BaseItem } from './group-item-selector-list.component'

interface GroupItemSelectorCheckCheckboxComponentProps<Item extends BaseItem> {
  selected: boolean
  className?: string
  item: Item
}

export function GroupItemSelectorCheckCheckboxComponent<Item extends BaseItem>({
  selected,
  className,
  item
}: GroupItemSelectorCheckCheckboxComponentProps<Item>) {
  const { toggleItem } = useGroupItemSelectorContext<Item>()

  return (
    <button onClick={() => item && toggleItem(item)} type="button">
      {selected ? (
        <Check className={cn('!w-3.5 !h-3.5', className)} />
      ) : (
        <Square className={cn('!w-3.5 !h-3.5', className)} />
      )}
    </button>
  )
}
