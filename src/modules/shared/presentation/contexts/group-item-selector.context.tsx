import { createContext, useContext, ReactNode } from 'react'
import { useGroupItemSelector } from '../hooks/use-group-selector'
import type {
  BaseItem,
  Group
} from '../components/group-item-selector/group-item-selector-list.component'

const GroupItemSelectorContext = createContext<ReturnType<
  typeof useGroupItemSelector
> | null>(null)

export function GroupItemSelectorProvider<Item extends BaseItem>({
  value,
  onChange,
  groups,
  children
}: {
  value: number[]
  onChange: (ids: number[]) => void
  groups: Group<Item>[]
  children: ReactNode
}) {
  const ctx = useGroupItemSelector<Item>({ value, onChange, groups })

  return (
    <GroupItemSelectorContext.Provider value={ctx}>
      {children}
    </GroupItemSelectorContext.Provider>
  )
}

export function useGroupItemSelectorContext<Item extends BaseItem>() {
  const ctx = useContext(GroupItemSelectorContext) as ReturnType<
    typeof useGroupItemSelector<Item>
  > | null

  if (!ctx) {
    throw new Error(
      'useGroupItemSelectorContext must be used within a GroupItemSelectorProvider'
    )
  }

  return ctx
}
