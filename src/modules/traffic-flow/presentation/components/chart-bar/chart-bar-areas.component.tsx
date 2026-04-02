import { Bar } from 'recharts'
import { useChartBarContext } from '../../contexts/chart-bar.context'

export function ChartBarAreas() {
  const { orderedVisibleSeries: series } = useChartBarContext()

  return (
    <>
      {series.map((item, index) => (
        <Bar
          isAnimationActive={false}
          key={item.key}
          dataKey={item.key}
          stackId="a"
          fill={`var(--color-${item.key})`}
          radius={index === series.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
          barSize={90}
        />
      ))}
    </>
  )
}
