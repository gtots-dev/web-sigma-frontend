import { Area } from 'recharts'
import { useChartGradientLineContext } from '../../contexts/chart-gradient-line.context'

export function TrafficFlowChartAreas() {
  const { orderedVisibleSeries: series } = useChartGradientLineContext()

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
          stackId={item.stacked ? 'a' : undefined}
          isAnimationActive={false}
        />
      ))}
    </>
  )
}
