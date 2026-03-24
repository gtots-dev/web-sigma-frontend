import type { SeriesConfig } from '../components/traffic-flow-absolute-chart'

export function useChartSeries<TKey extends string>(
  series: SeriesConfig<TKey>[],
  selectedSeries: TKey[]
) {
  const visibleSeries = series.filter((s) => selectedSeries.includes(s.key))

  const chartConfig = Object.fromEntries(
    visibleSeries.map((s) => [s.key, { label: s.label, color: s.color }])
  )

  return { visibleSeries, chartConfig }
}
