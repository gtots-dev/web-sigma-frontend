'use client'

import type { ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'
import { useActivityReportForm } from '../../hooks/use-activity-form.hook'
import type { ActivityReportFiltersInterface } from '@/modules/activity-report/domain/interfaces/activity-report-filters.interface'
import type { PaginationInterface } from '@/modules/shared/domain/interfaces/pagination.interfaces'

interface ActivityReportFormProviderComponentProps {
  children: ReactNode
  initSettings: {
    filters: ActivityReportFiltersInterface
    pagination: PaginationInterface
  }
}

export function ActivityReportFormProviderComponent({
  children,
  initSettings
}: ActivityReportFormProviderComponentProps) {
  const methods = useActivityReportForm(initSettings)
  return <FormProvider {...methods}>{children}</FormProvider>
}
