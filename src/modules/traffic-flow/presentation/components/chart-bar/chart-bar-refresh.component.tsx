import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { RefreshCcw } from 'lucide-react'

export function ChartBarRefreshButton({
  onClick
}: {
  onClick: VoidFunction
}) {
  return (
    <Button variant="outline" size="icon" className="w-8 h-8" onClick={onClick}>
      <RefreshCcw />
    </Button>
  )
}
