'use client'

import { useChartGradientLineContext } from '../../contexts/chart-gradient-line.context'

export function ChartGradientLineScrollArea({
  children
}: {
  children: React.ReactNode
}) {
  const { chartWrapperRef } = useChartGradientLineContext()

  return (
    <div
      ref={chartWrapperRef}
      className="flex flex-col h-full w-full overflow-x-auto overflow-y-hidden"
    >
      {children}
    </div>
  )
}
