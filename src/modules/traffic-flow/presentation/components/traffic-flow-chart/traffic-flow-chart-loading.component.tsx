import type { ReactNode } from 'react'
import { TrafficFlowChart } from '.'

type ChartLoadingProps = {
  loading: boolean
  children?: ReactNode
}

export function TrafficFlowChartLoading({
  loading,
  children
}: ChartLoadingProps) {
  return (
    <div className="relative h-[650px] border rounded-lg">
      {loading && (
        <div className="absolute inset-0 z-10">
          <TrafficFlowChart.Skeleton />
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
