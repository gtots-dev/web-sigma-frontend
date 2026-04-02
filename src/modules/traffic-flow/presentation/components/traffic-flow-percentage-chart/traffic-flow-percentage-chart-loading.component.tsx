import type { ReactNode } from 'react'
import { TrafficFlowPercentageChart } from '.'

type ChartLoadingProps = {
  loading: boolean
  children?: ReactNode
}

export function TrafficFlowPercentageChartLoading({
  loading,
  children
}: ChartLoadingProps) {
  return (
    <div className="relative h-[850px] border rounded-lg">
      {loading && (
        <div className="absolute inset-0 z-10">
          <TrafficFlowPercentageChart.Skeleton />
        </div>
      )}

      <div
        className={`
          transition-opacity duration-500 ease-in-out
          ${loading ? 'opacity-0' : 'opacity-100'}
        `}
      >
        {children}
      </div>
    </div>
  )
}
