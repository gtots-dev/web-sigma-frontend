import { CommandItem } from '@/modules/shared/presentation/components/shadcn/command'
import { Check, Square } from 'lucide-react'
import { useGroupItemSelectorContext } from '../../contexts/group-item-selector.context'

export function GroupItemSelectorItem<
  Item extends { id: number; name: string }
>({ item }: { item: Item }) {
  const { isSelected, toggleItem } = useGroupItemSelectorContext<Item>()
  const selected = isSelected(item.id)

  return (
    <CommandItem
      key={item.id}
      onSelect={() => toggleItem(item)}
      className="flex gap-x-4 items-center justify-start"
      forceMount
    >
      {selected ? (
        <Check className="!w-3.5 !h-3.5" />
      ) : (
        <Square className="!w-3.5 !h-3.5 opacity-50" />
      )}
      <span>{item.name}</span>
    </CommandItem>
  )
}
