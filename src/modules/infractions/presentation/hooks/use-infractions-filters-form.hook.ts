import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import type { InfractionsFiltersInterface } from '../../domain/interfaces/infractions-filters.interface'
import {
  InfractionsFiltersSchema,
  type InfractionsFiltersSchemaType
} from './use-infractions-filters-schema.hook'

export function useInfractionsFiltersForm(filters?: InfractionsFiltersInterface) {
  const defaultValues = useMemo<InfractionsFiltersSchemaType>(
    () => ({
      places: {
        point_ids: filters?.places?.point_ids ?? null,
        lane_ids: filters?.places?.lane_ids ?? null,
        group_ids: filters?.places?.group_ids ?? null
      },
      date_range: {
        start: filters?.date_range?.start ?? null,
        end: filters?.date_range?.end ?? null
      },
      time_range: {
        start: filters?.time_range?.start ?? null,
        end: filters?.time_range?.end ?? null
      },
      violation_id: filters?.violation_id ?? null,
      restriction_id: filters?.restriction_id ?? null
    }),
    [filters]
  )

  return useForm<InfractionsFiltersSchemaType>({
    defaultValues,
    resolver: zodResolver(InfractionsFiltersSchema)
  })
}
