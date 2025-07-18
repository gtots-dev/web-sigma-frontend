import {
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandSeparator
} from '@/modules/shared/presentation/components/shadcn/command'
import { Fragment, ReactNode } from 'react'
import { useGroupItemSelectorContext } from '../../contexts/group-item-selector.context'

export interface BaseItem {
  id?: number
  name: string
}

export interface Group<Item = BaseItem> {
  name?: string
  items: Item[]
}

interface GroupItemSelectorListProps<Item> {
  children: (item: Item, group?: Group<Item>) => ReactNode
  messageEmpty: string
}

export function GroupItemSelectorList<Item extends BaseItem>({
  children,
  messageEmpty
}: GroupItemSelectorListProps<Item>) {
  const { searchableGroups, areAllGroupItemsSelected, toggleAllInGroup } =
    useGroupItemSelectorContext<Item>()

  if (searchableGroups.length === 0) {
    return (
      <CommandList>
        <CommandEmpty>{messageEmpty}</CommandEmpty>
      </CommandList>
    )
  }

  return (
    <CommandList>
      {searchableGroups.map((group, index) => {
        const allSelected = areAllGroupItemsSelected(group)

        return (
          <Fragment key={group.name}>
            <CommandGroup
              heading={
                <div className="flex items-center justify-between">
                  <span>{group.name}</span>
                  <button
                    type="button"
                    onClick={() => toggleAllInGroup(group)}
                    className="flex items-center gap-2 focus:outline-none underline underline-offset-2 text-primary-300"
                  >
                    {allSelected ? 'Remover seleção' : 'Selecionar todos'}
                  </button>
                </div>
              }
              forceMount
            >
              {group.items.map((item) => children(item, group))}
            </CommandGroup>

            {index < searchableGroups.length - 1 && <CommandSeparator />}
          </Fragment>
        )
      })}
    </CommandList>
  )
}
