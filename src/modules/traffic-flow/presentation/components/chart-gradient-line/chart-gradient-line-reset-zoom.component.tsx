import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { SearchX } from 'lucide-react'

export function ChartGradientLineResetZoom({
  onClick,
  disabled
}: {
  onClick: VoidFunction
  disabled: boolean
}) {
  return (
    <Button
      size="icon"
      className="!w-8 !h-8"
      variant="outline"
      onClick={onClick}
      disabled={disabled}
    >
      <SearchX />
    </Button>
  )
}
