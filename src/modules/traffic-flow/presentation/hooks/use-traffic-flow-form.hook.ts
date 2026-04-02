import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  TrafficFlowSchema,
  TrafficFlowSchemaType
} from './use-traffic-flow-schema.hook'
import { useMemo } from 'react'
import type { TrafficFlowFiltersInterface } from '../../domain/interfaces/traffic-flow-filters.interface'

export function useTrafficFlowForm(filters: TrafficFlowFiltersInterface) {
  const defaultValues = useMemo<TrafficFlowSchemaType>(
    () => ({
      places: {
        point_ids: filters?.places?.point_ids ?? null,
        lane_ids: filters?.places?.lane_ids ?? null,
        group_ids: filters?.places?.group_ids ?? null
      },
      granularity: filters?.granularity ?? null,
      date_range: {
        start: filters?.date_range?.start ?? null,
        end: filters?.date_range?.end ?? null
      },
      time_range: {
        start: filters?.time_range?.start ?? null,
        end: filters?.time_range?.end ?? null
      }
    }),
    [filters]
  )

  return useForm<TrafficFlowSchemaType>({
    defaultValues,
    resolver: zodResolver(TrafficFlowSchema)
  })
}
