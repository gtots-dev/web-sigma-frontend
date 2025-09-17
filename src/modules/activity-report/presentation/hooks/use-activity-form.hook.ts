import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  ActivityReportSchema,
  ActivityReportSchemaType
} from './use-activity-schema.hook'
import { useMemo } from 'react'
import type { ActivityReportFiltersInterface } from '../../domain/interfaces/activity-report-filters.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'

export function useActivityReportForm({
  filters,
  pagination
}: {
  filters: ActivityReportFiltersInterface
  pagination: PaginationInterface
}) {
  const defaultValues = useMemo<ActivityReportSchemaType>(
    () => ({
      actions: filters?.actions ?? [],
      contract_ids: filters?.contract_ids ?? [],
      operation_ids: filters?.operation_ids ?? [],
      user_ids: filters?.user_ids ?? [],
      date_range: {
        start: filters?.date_range?.start ?? null,
        end: filters?.date_range?.end ?? null
      },
      page: pagination.page ?? 1,
      per_page: pagination.per_page ?? 50
    }),
    [filters, pagination]
  )

  return useForm<ActivityReportSchemaType>({
    defaultValues,
    resolver: zodResolver(ActivityReportSchema)
  })
}
