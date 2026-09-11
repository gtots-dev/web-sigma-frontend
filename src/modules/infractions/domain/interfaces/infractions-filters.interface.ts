export interface InfractionsPlacesInterface {
  lane_ids?: number[] | null
  point_ids?: number[] | null
  group_ids?: number[] | null
}

export interface InfractionsDateRangeInterface {
  start: string
  end: string
}

export interface InfractionsTimeRangeInterface {
  start?: string | null
  end?: string | null
}

export interface InfractionsFiltersInterface {
  places?: InfractionsPlacesInterface | null
  date_range: InfractionsDateRangeInterface
  time_range?: InfractionsTimeRangeInterface | null
  violation_id?: number[] | null
  restriction_id?: number[] | null
}
