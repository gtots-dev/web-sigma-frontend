import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Lock, LockOpen } from 'lucide-react'
import { useChartScrollLock } from '../../hooks/use-chart-scroll-lock.hook'

export function ChartGradientLineLockScroll() {
  const { locked, focusAndLock, unlock } = useChartScrollLock()

  return (
    <Button
      size="icon"
      className="!w-8 !h-8"
      variant={locked ? 'primary' : 'outline'}
      onClick={() => (!locked ? focusAndLock() : unlock())}
    >
      {locked ? <Lock /> : <LockOpen />}
    </Button>
  )
}
