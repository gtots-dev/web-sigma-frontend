'use client'

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
  heading?: (
    group: Group<Item>,
    allSelected: boolean,
    toggleAllInGroup: (group: Group<Item>) => void
  ) => ReactNode
  messageGroupEmpty: string
  messageItemEmpty: string
  hasPermission?: boolean
  messagePermission?: string
}

export function GroupItemSelectorList<Item extends BaseItem>({
  children,
  heading,
  messageGroupEmpty,
  messageItemEmpty,
  hasPermission = true,
  messagePermission = 'Você não tem permissão para visualizar estes itens.'
}: GroupItemSelectorListProps<Item>) {
  const { searchableGroups, areAllGroupItemsSelected, toggleAllInGroup } =
    useGroupItemSelectorContext<Item>()

  if (!hasPermission) {
    return (
      <CommandList>
        <CommandEmpty>{messagePermission}</CommandEmpty>
      </CommandList>
    )
  }

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

        return (
          <Fragment key={group.name}>
            {isGroupEmpty ? (
              <CommandEmpty>{messageGroupEmpty}</CommandEmpty>
            ) : (
              <CommandGroup
                heading={
                  !isGroupEmpty
                    ? heading?.(group, allSelected, toggleAllInGroup)
                    : undefined
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
