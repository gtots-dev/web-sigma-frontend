import {
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandSeparator
} from '@/modules/shared/presentation/components/shadcn/command'
import { Fragment, ReactNode } from 'react'
import { useGroupItemSelectorContext } from '../../contexts/group-item-selector.context'
import type { ContractEntity } from '@/modules/contracts/domain/entities/contract.entity'
import { useCacheSelectedBindsStore } from '@/modules/users/presentation/stores/cache-selecteds-binds.store'

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
  messageGroupEmpty: string
  messageItemEmpty: string
}

export function GroupItemSelectorList<Item extends BaseItem>({
  children,
  messageGroupEmpty,
  messageItemEmpty
}: GroupItemSelectorListProps<Item>) {
  const { searchableGroups, areAllGroupItemsSelected, toggleAllInGroup } =
    useGroupItemSelectorContext<Item>()

  const { toggleContractForSelectedProfile } = useCacheSelectedBindsStore()

  if (searchableGroups.length === 0) {
    return (
      <CommandList>
        <CommandEmpty>{messageItemEmpty}</CommandEmpty>
      </CommandList>
    )
  }

  return (
    <CommandList>
      {searchableGroups.map((group, index) => {
        const allSelected = areAllGroupItemsSelected(group)
        const isGroupEmpty = group.items.length === 0

        const handleToggleAll = () => {
          toggleAllInGroup(group)

          group.items.map((item) => {
            if ('id' in item && typeof item.id === 'number')
              toggleContractForSelectedProfile(item.id as ContractEntity['id'])
          })
        }

        return (
          <Fragment key={group.name}>
            {isGroupEmpty ? (
              <CommandEmpty>{messageGroupEmpty}</CommandEmpty>
            ) : (
              <CommandGroup
                heading={
                  !isGroupEmpty ? (
                    <div className="flex items-center justify-between">
                      <span>{group.name}</span>
                      <button
                        type="button"
                        onClick={handleToggleAll}
                        className="flex items-center gap-2 focus:outline-none underline underline-offset-2 text-primary-300"
                      >
                        {allSelected ? 'Remover seleção' : 'Selecionar todos'}
                      </button>
                    </div>
                  ) : undefined
                }
                forceMount
              >
                {group.items.map((item) => children(item, group))}
              </CommandGroup>
            )}
            {index < searchableGroups.length - 1 && <CommandSeparator />}
          </Fragment>
        )
      })}
    </CommandList>
  )
}
