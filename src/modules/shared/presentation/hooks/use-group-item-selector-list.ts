import { useState } from 'react'
import type {
  BaseItem,
  Group
} from '../components/group-item-selector/group-item-selector-list.component'

export function useGroupItemSelectorCore<Item extends BaseItem>(
  value: number[],
  onChange: (ids: number[]) => void
) {
  const [showOnlySelected, setShowOnlySelected] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')

  const isSelected = (id: number) => value.includes(id)

  const toggleItem = (item: Item) => {
    const exists = isSelected(item.id)
    const updated = exists
      ? value.filter((id) => id !== item.id)
      : [...value, item.id]
    onChange(updated)
  }

  const areAllGroupItemsSelected = (group: Group<Item>): boolean =>
    group.items.every((item) => isSelected(item.id))

  const toggleAllInGroup = (group: Group<Item>) => {
    const allSelected = areAllGroupItemsSelected(group)
    const groupIds = group.items.map((item) => item.id)

    const newValue = allSelected
      ? value.filter((id) => !groupIds.includes(id))
      : [...new Set([...value, ...groupIds])]

    onChange(newValue)
  }

  return {
    value,
    onChange,
    isSelected,
    toggleItem,
    areAllGroupItemsSelected,
    toggleAllInGroup,
    showOnlySelected,
    toggleShowOnlySelected: () => setShowOnlySelected((prev) => !prev),
    searchValue,
    setSearchValue
  }
}
