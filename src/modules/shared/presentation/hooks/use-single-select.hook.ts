import { useMemo, useState } from 'react'

export interface SingleSelectItem {
  id: number | string
  label: string
}

interface UseSingleSelectProps<T extends SingleSelectItem> {
  items: T[]
  selected?: number | string
  onChange: (value?: number | string) => void
}

export function useSingleSelect<T extends SingleSelectItem>({
  items,
  selected,
  onChange
}: UseSingleSelectProps<T>) {
  const [search, setSearch] = useState('')

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items

    const term = search.toLowerCase()

    return items.filter((i) => i.label.toLowerCase().includes(term))
  }, [items, search])

  const select = (id: number | string) => {
    if (selected === id) {
      onChange(undefined)
    } else {
      onChange(id)
    }
  }

  const clear = () => {
    onChange(undefined)
  }

  const clearSearch = () => {
    setSearch('')
  }

  const selectedItem = items.find((i) => i.id === selected)

  const label = selectedItem?.label

  return {
    search,
    setSearch,
    filteredItems,
    select,
    clear,
    clearSearch,
    selectedItem,
    label
  }
}
