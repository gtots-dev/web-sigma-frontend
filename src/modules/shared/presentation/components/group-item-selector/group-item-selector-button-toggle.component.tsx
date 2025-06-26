import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useGroupItemSelectorContext } from '../../contexts/group-item-selector.context'
import type { ComponentProps } from 'react'
import { Filter } from 'lucide-react'

export function GroupItemSelectorToggleButton({
  ...props
}: ComponentProps<'button'>) {
  const { showOnlySelected, toggleShowOnlySelected } =
    useGroupItemSelectorContext()

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={toggleShowOnlySelected}
      {...props}
    >
      {showOnlySelected ? 'Mostrar todos' : 'Mostrar selecionados'}
      <Filter />
    </Button>
  )
}
