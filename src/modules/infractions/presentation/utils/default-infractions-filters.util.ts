import type { InfractionsFiltersInterface } from '../../domain/interfaces/infractions-filters.interface'

export function getDefaultInfractionsFilters(): InfractionsFiltersInterface {
  const end = new Date()
  const start = new Date()
  start.setMonth(start.getMonth() - 1)

  const formatDate = (d: Date) => d.toISOString().split('T')[0]

  return {
    date_range: {
      start: formatDate(start),
      end: formatDate(end)
    },
    time_range: {
      start: '00:00:00',
      end: '23:59:59'
    },
    places: {
      lane_ids: [],
      point_ids: [],
      group_ids: []
    },
    violation_id: [],
    restriction_id: []
  }
}
