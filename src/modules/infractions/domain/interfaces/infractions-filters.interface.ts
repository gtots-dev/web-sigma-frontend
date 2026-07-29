export interface InfractionsPlacesInterface {
  lane_ids?: number[] | null
  point_ids?: number[] | null
  group_ids?: number[] | null
}

export interface InfractionsDateRangeInterface {
  start?: string | null
  end?: string | null
}

export interface InfractionsTimeRangeInterface {
  start?: string | null
  end?: string | null
}

export interface InfractionsFiltersInterface {
  places?: InfractionsPlacesInterface | null
  date_range?: InfractionsDateRangeInterface | null
  time_range?: InfractionsTimeRangeInterface | null
  violation_id?: number[] | null
  restriction_id?: number[] | null
}
