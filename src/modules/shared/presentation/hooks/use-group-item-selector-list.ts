import { useState } from 'react'
import type { BaseItem } from '../components/group-item-selector/group-item-selector-list.component'

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

  return {
    value,
    onChange,
    isSelected,
    toggleItem,
    showOnlySelected,
    toggleShowOnlySelected: () => setShowOnlySelected((prev) => !prev),
    searchValue,
    setSearchValue
  }
}
