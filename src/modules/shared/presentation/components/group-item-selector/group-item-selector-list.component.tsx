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
import { MESSAGES_PERMISSIONS } from '../../messages/permissions'

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
  children
}: {
  children: (group: { name: string }, item: Item) => ReactNode
}) {
  const { searchValue, setSearchValue, searchableGroups } =
    useGroupItemSelectorContext<Item>()

  return (
    <Command className="rounded-lg border shadow-md !h-auto">
      <CommandInput
        placeholder="Buscar permissão ou grupo..."
        value={searchValue}
        onValueChange={setSearchValue}
      />
      <CommandList>
        {searchableGroups.length === 0 ? (
          <CommandEmpty>{MESSAGES_PERMISSIONS[6.6]}</CommandEmpty>
        ) : (
          searchableGroups.map((group, index) => (
            <Fragment key={group.name}>
              <CommandGroup heading={group.name} forceMount>
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
