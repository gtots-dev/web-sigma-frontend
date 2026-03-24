'use client'

import type { SeriesGroupInterface } from '../../domain/interfaces/traffic-flow.interface'

export type ChartDatum = {
  date: string
  [vehicleType: string]: string | number
}

export function useTrafficChartAdapter(
  apiResponse?: SeriesGroupInterface<string>[]
): ChartDatum[] {
  if (!apiResponse?.length) return []
  const seriesObject = apiResponse[0]
  const resultMap: Record<string, Record<string, number>> = {}

  for (const vehicleType of Object.keys(seriesObject)) {
    const points = seriesObject[vehicleType]

    for (const point of points) {
      const date = point.data
      const value = point.value

      if (!resultMap[date]) resultMap[date] = {}
      resultMap[date][vehicleType] = value
    }
  }

  return Object.entries(resultMap).map(([date, values]) => ({
    date,
    ...values
  }))
}
