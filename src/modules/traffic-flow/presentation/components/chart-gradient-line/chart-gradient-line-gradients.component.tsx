import { useChartGradientLineContext } from "../../contexts/chart-gradient-line.context"

export function TrafficFlowChartGradients() {
  const { orderedVisibleSeries: series } = useChartGradientLineContext()

  return (
    <defs>
      {series.map((serie) => (
        <linearGradient
          key={serie.key}
          id={`fill-${serie.color}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="5%" stopColor={serie.color} stopOpacity={0.8} />
          <stop offset="95%" stopColor={serie.color} stopOpacity={0.1} />
        </linearGradient>
      ))}
    </defs>
  )
}
