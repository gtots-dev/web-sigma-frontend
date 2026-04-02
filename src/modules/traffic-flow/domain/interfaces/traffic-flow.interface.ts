export interface TypeOfVehiclesInterface {
  data: string
  value: number
}

export type SeriesGroupInterface<TSeriesKey extends string = string> = {
  [K in TSeriesKey]: TypeOfVehiclesInterface[]
}

export interface TrafficFlowInterface<TSeriesKey extends string = string> {
  volume_absolute: SeriesGroupInterface<TSeriesKey>[]
  volume_percentage: SeriesGroupInterface<TSeriesKey>[]
}
