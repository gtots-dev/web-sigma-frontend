import { useFilteredGroups } from './use-filtered-groups'
import { useGroupItemSelectorCore } from './use-group-item-selector-list'
import { useSearchableGroups } from './use-searchable-groups'
import type {
  BaseItem,
  Group
} from '../components/group-item-selector/group-item-selector-list.component'

export function useGroupItemSelector<Item extends BaseItem>({
  value,
  onChange,
  groups
}: {
  value: number[]
  onChange: (ids: number[]) => void
  groups: Group<Item>[]
}) {
  const core = useGroupItemSelectorCore<Item>(value, onChange)

  const filteredGroups = useFilteredGroups(
    groups,
    core.showOnlySelected,
    core.isSelected
  )
  const searchableGroups = useSearchableGroups(filteredGroups, core.searchValue)

  return {
    ...core,
    groups,
    filteredGroups,
    searchableGroups
  }
}
