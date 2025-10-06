'use client'

import type { ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { useActivityReportForm } from '../../hooks/use-activity-form.hook'
import type { ActivityReportFiltersInterface } from '@/modules/activity-report/domain/interfaces/activity-report-filters.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'

interface ActivityReportFormComponentProps {
  children: ReactNode
  initSettings: {
    filters: ActivityReportFiltersInterface
    pagination: PaginationInterface
  }
}

export function ActivityReportFormComponent({
  children,
  initSettings
}: ActivityReportFormComponentProps) {
  const methods = useActivityReportForm(initSettings)
  return (
    <FormProvider {...methods}>
      <form autoComplete="off" className="w-full h-full">
        {children}
      </form>
    </FormProvider>
  )
}
