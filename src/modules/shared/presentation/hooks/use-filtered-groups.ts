import { useMemo } from 'react'
import type {
  BaseItem,
  Group
} from '../components/group-item-selector/group-item-selector-list.component'

export function useFilteredGroups<Item extends BaseItem>(
  groups: Group<Item>[],
  showOnlySelected: boolean,
  isSelected: (id: number) => boolean
) {
  return useMemo(() => {
    if (!showOnlySelected) return groups
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => isSelected(item.id))
      }))
      .filter((group) => group.items.length > 0)
  }, [groups, showOnlySelected, isSelected])
}
