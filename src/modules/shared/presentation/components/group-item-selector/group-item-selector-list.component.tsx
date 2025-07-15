import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator
} from '@/modules/shared/presentation/components/shadcn/command'
import { Fragment, ReactNode } from 'react'
import { useGroupItemSelectorContext } from '../../contexts/group-item-selector.context'

export interface BaseItem {
  id: number
  name: string
}

export interface Group<Item = BaseItem> {
  name: string
  items: Item[]
}

export function GroupItemSelectorList<
  Item extends { id: number; name: string }
>({
  children,
  messageEmpty
}: {
  children: (group: { name: string }, item: Item) => ReactNode
  messageEmpty: string
}) {
  const {
    searchValue,
    setSearchValue,
    searchableGroups,
    areAllGroupItemsSelected,
    toggleAllInGroup
  } = useGroupItemSelectorContext<Item>()

  return (
    <Command className="rounded-lg border shadow-md !h-auto">
      <CommandInput
        placeholder="Buscar permissão ou grupo..."
        value={searchValue}
        onValueChange={setSearchValue}
      />
      <CommandList>
        {searchableGroups.length === 0 ? (
          <CommandEmpty>{messageEmpty}</CommandEmpty>
        ) : (
          searchableGroups.map((group, index) => (
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
                      {areAllGroupItemsSelected(group)
                        ? 'Remover seleção'
                        : 'Selecionar todos'}
                    </button>
                  </div>
                }
                forceMount
              >
                {group.items.map((item) => children(group, item))}
              </CommandGroup>
              {index !== searchableGroups.length - 1 && <CommandSeparator />}
            </Fragment>
          ))
        )}
      </CommandList>
    </Command>
  )
}
