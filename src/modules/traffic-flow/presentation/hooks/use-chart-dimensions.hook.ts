export function useChartDimensions(points: number) {
  const PIXELS_PER_POINT = 24

  return {
    chartWidth: Math.max(points * PIXELS_PER_POINT, 800)
  }
}
