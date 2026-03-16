import { Area } from 'recharts'
import type { SeriesConfig } from '.'

export function TrafficFlowChartAreas<TKey extends string>({
  series
}: {
  series: SeriesConfig<TKey>[]
}) {
  return (
    <>
      {series.map((item) => (
        <Area
          key={item.key}
          dataKey={item.key}
          type="step"
          stroke={item.color}
          fill={`url(#fill-${item.color})`}
          strokeWidth={2}
          stackId={item.stacked ? "a" : undefined}
          isAnimationActive={false}
        />
      ))}
    </>
  )
}
