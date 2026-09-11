import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import type { InfractionsFiltersInterface } from '../../domain/interfaces/infractions-filters.interface'
import {
  InfractionsFiltersSchema,
  type InfractionsFiltersSchemaType
} from './use-infractions-filters-schema.hook'
import { getDefaultInfractionsFilters } from '../utils/default-infractions-filters.util'

export function useInfractionsFiltersForm(filters?: InfractionsFiltersInterface) {
  const defaultValues = useMemo<InfractionsFiltersSchemaType>(() => {
    const initial = filters ?? getDefaultInfractionsFilters()
    return {
      places: {
        point_ids: initial.places?.point_ids ?? [],
        lane_ids: initial.places?.lane_ids ?? [],
        group_ids: initial.places?.group_ids ?? []
      },
      date_range: {
        start: initial.date_range.start,
        end: initial.date_range.end
      },
      time_range: {
        start: initial.time_range?.start ?? '00:00:00',
        end: initial.time_range?.end ?? '23:59:59'
      },
      violation_id: initial.violation_id ?? [],
      restriction_id: initial.restriction_id ?? []
    }
  }, [filters])

  return useForm<InfractionsFiltersSchemaType>({
    defaultValues,
    resolver: zodResolver(InfractionsFiltersSchema)
  })
}
