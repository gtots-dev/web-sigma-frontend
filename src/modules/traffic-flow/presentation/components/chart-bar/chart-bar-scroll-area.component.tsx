'use client'

import { useChartBarContext } from '../../contexts/chart-bar.context'

export function ChartBarScrollArea({
  children
}: {
  children: React.ReactNode
}) {
  const { chartWrapperRef } = useChartBarContext()

  return (
    <div
      ref={chartWrapperRef}
      className="flex flex-col h-full w-full overflow-x-auto overflow-y-hidden"
    >
      {children}
    </div>
  )
}
