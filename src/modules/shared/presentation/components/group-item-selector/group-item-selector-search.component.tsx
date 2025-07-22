import { useGroupItemSelectorContext } from '../../contexts/group-item-selector.context'
import { CommandInput } from '../shadcn/command'

interface GroupItemSelectorSearchProps {
  placeholder: string
}

export function GroupItemSelectorSearch({
  placeholder
}: GroupItemSelectorSearchProps) {
  const { searchValue, setSearchValue } = useGroupItemSelectorContext()

  return (
    <CommandInput
      placeholder={placeholder}
      value={searchValue}
      onValueChange={setSearchValue}
    />
  )
}
