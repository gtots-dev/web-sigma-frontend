import { useMemo } from 'react'
import type {
  BaseItem,
  Group
} from '../components/group-item-selector/group-item-selector-list.component'

export function useSearchableGroups<Item extends BaseItem>(
  groups: Group<Item>[],
  searchValue: string
) {
  return useMemo(() => {
    const normalized = searchValue.trim().toLowerCase()
    if (!normalized) return groups

    return groups
      .map((group) => {
        const groupMatches = group.name.toLowerCase().includes(normalized)
        const matchedItems = group.items.filter((item) =>
          item.name.toLowerCase().includes(normalized)
        )

        if (groupMatches) return { ...group }
        if (matchedItems.length > 0) return { ...group, items: matchedItems }

        return null
      })
      .filter(Boolean) as Group<Item>[]
  }, [groups, searchValue])
}
