import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { Lock, LockOpen } from 'lucide-react'
import { useChartBarContext } from '../../contexts/chart-bar.context'

export function ChartBarLockScroll() {
  const { locked, focusAndLock, unlock } = useChartBarContext()

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
