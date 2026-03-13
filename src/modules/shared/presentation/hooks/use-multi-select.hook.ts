import { useMemo, useState } from 'react'

export interface MultiSelectItem<
  TId extends string | number = string | number
> {
  id: TId
  label: string
}

interface UseMultiSelectProps<T extends MultiSelectItem> {
  items: T[]
  selected: (number | string)[]
  onChange: (value: (number | string)[]) => void
}

export function useMultiSelect<T extends MultiSelectItem>({
  items,
  selected,
  onChange
}: UseMultiSelectProps<T>) {
  const [search, setSearch] = useState('')

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items

    const term = search.toLowerCase()

    return items.filter((i) => i.label.toLowerCase().includes(term))
  }, [items, search])

  const toggle = (id: number | string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((v) => v !== id))
    } else {
      onChange([...selected, id])
    }
  }

  const selectAll = () => {
    onChange(items.map((i) => i.id))
  }

  const clearAll = () => {
    onChange([])
  }

  const clearSearch = () => {
    setSearch('')
  }

  const selectedItems = items.filter((i) => selected.includes(i.id))

  const label = useMemo(() => {
    if (selectedItems.length === 0) return undefined

    if (selectedItems.length <= 2) {
      return selectedItems.map((i) => i.label).join(', ')
    }

    const [first, second, ...rest] = selectedItems

    return `${first.label}, ${second.label} +${rest.length}`
  }, [selectedItems])

  return {
    search,
    setSearch,
    filteredItems,
    toggle,
    selectAll,
    clearAll,
    clearSearch,
    selectedItems,
    label
  }
}
