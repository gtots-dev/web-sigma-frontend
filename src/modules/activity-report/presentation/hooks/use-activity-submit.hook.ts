'use client'

import { useCallback } from 'react'
import type { ActivityReportSchemaType } from './use-activity-schema.hook'
import { useActivityReportStore } from '../stores/activity-report.store'

function removeUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<T>
}

export function useActivityReportSubmit() {
  const { getActivityReport } = useActivityReportStore()

  const handleSubmit = useCallback(
    async ({
      actions,
      contract_ids,
      date_range,
      operation_ids,
      page,
      per_page,
      user_ids,
      time_range
    }: ActivityReportSchemaType): Promise<void> => {
      try {
        await getActivityReport({
          filters: removeUndefined({
            actions,
            contract_ids,
            operation_ids,
            user_ids,
            date_range,
            time_range
          }),
          pagination: removeUndefined({
            per_page,
            page
          })
        })
      } catch (err: unknown) {
        console.log(err)
      }
    },
    [getActivityReport]
  )

  return { handleSubmit }
}
